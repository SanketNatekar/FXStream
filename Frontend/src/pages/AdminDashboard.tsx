// AdminDashboard.tsx (integrated registered student view)
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useToast } from '../hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { Batch } from '../types/batch';

const AdminDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [batches, setBatches] = useState<Batch[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [currentUsers, setCurrentUsers] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    price: 0,
    image: '',
    startDate: '',
    maxStudents: 50,
  });

  useEffect(() => {
    axios.get('http://localhost:4000/api/batches')
      .then(res => {
        const formatted = res.data.map((b: any) => ({ ...b, id: b._id }));
        setBatches(formatted);
      })
      .catch(err => console.error('Error fetching batches:', err));
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      duration: '',
      price: 0,
      image: '',
      startDate: '',
      maxStudents: 50,
    });
  };

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/batches', {
        batchName: formData.title,
        description: formData.description,
        duration: formData.duration,
        price: formData.price,
        startDate: formData.startDate,
        totalSlots: formData.maxStudents,
        mode: 'online',
        language: 'English',
        thumbnail: formData.image,
      });
      const newBatch = { ...res.data, id: res.data._id };
      setBatches([...batches, newBatch]);
      setIsCreateModalOpen(false);
      resetForm();
      toast({ title: 'Success', description: 'Batch created successfully!' });
    } catch (err) {
      console.error('Error creating batch:', err);
      toast({ title: 'Error', description: 'Failed to create batch.' });
    }
  };

  const handleEditBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBatch) return;
    try {
      const updated = {
        batchName: formData.title,
        description: formData.description,
        duration: formData.duration,
        price: formData.price,
        startDate: formData.startDate,
        totalSlots: formData.maxStudents,
        mode: 'online' as "online" | "offline",
        language: 'English' as 'English' | 'Hindi' | 'Marathi',
        thumbnail: formData.image,
      };
      await axios.put(`http://localhost:4000/api/batches/${editingBatch.id}`, updated);
      const updatedBatches = batches.map(b => b.id === editingBatch.id ? { ...b, ...updated } : b);
      setBatches(updatedBatches);
      setIsEditModalOpen(false);
      setEditingBatch(null);
      resetForm();
      toast({ title: 'Success', description: 'Batch updated successfully!' });
    } catch (err) {
      console.error('Error updating batch:', err);
      toast({ title: 'Error', description: 'Failed to update batch.' });
    }
  };

  const handleDeleteBatch = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/batches/${id}`);
      setBatches(batches.filter(b => b.id !== id));
      toast({ title: 'Success', description: 'Batch deleted successfully!' });
    } catch (err) {
      console.error('Error deleting batch:', err);
      toast({ title: 'Error', description: 'Failed to delete batch.' });
    }
  };

  const handleViewUsers = async (batchId: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:4000/api/batches/registered-users/${batchId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCurrentUsers(res.data);
      setShowUsersModal(true);
    } catch (err) {
      console.error('Error fetching users:', err);
      toast({ title: 'Error', description: 'Could not fetch users.' });
    }
  };

  const openEditModal = (batch: Batch) => {
    setEditingBatch(batch);
    setFormData({
      title: batch.batchName,
      description: batch.description,
      duration: batch.duration,
      price: batch.price,
      image: batch.thumbnail,
      startDate: batch.startDate.slice(0, 10),
      maxStudents: batch.totalSlots,
    });
    setIsEditModalOpen(true);
  };

  const filteredBatches = batches.filter(b =>
    b.batchName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 flex flex-col items-center min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white"><Plus className="mr-2 h-4 w-4" />Create Batch</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Batch</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateBatch} className="space-y-4">
              <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Title" required className="w-full px-3 py-2 border rounded-md" />
              <input value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Description" required className="w-full px-3 py-2 border rounded-md" />
              <input value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} placeholder="Duration" required className="w-full px-3 py-2 border rounded-md" />
              <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: +e.target.value })} placeholder="Price" required className="w-full px-3 py-2 border rounded-md" />
              <input type="date" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} required className="w-full px-3 py-2 border rounded-md" />
              <input value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="Image URL" required className="w-full px-3 py-2 border rounded-md" />
              <input type="number" value={formData.maxStudents} onChange={e => setFormData({ ...formData, maxStudents: +e.target.value })} placeholder="Total Slots" required className="w-full px-3 py-2 border rounded-md" />
              <div className="flex justify-end">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">Create</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full flex justify-center mb-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search batches..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 w-full max-w-4xl">
        {filteredBatches.map(batch => (
          <Card key={batch.id} className="shadow-md rounded-md">
            <CardHeader className="flex justify-between bg-gray-100 p-4 rounded-t-md">
              <div>
                <CardTitle className="text-lg font-semibold text-blue-700">{batch.batchName}</CardTitle>
                <p className="text-sm text-gray-600">{batch.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleViewUsers(batch.id)}><Eye className="h-4 w-4" /></Button>
                <Button size="sm" variant="outline" onClick={() => openEditModal(batch)}><Edit className="h-4 w-4" /></Button>
                <Button size="sm" onClick={() => handleDeleteBatch(batch.id)} variant="destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardHeader>
            <CardContent className="bg-white p-4 border-t text-sm text-gray-700 space-y-1">
              <p><strong>Start:</strong> {new Date(batch.startDate).toLocaleDateString()}</p>
              <p><strong>Duration:</strong> {batch.duration}</p>
              <p><strong>Price:</strong> ₹{batch.price}</p>
              <p><strong>Slots:</strong> {(batch.registeredUsers?.length || 0)}/{batch.totalSlots}</p>
              <p><strong>Mode:</strong> {batch.mode}</p>
              <p><strong>Language:</strong> {batch.language}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showUsersModal} onOpenChange={setShowUsersModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registered Students</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {currentUsers.length === 0 ? (
              <p>No students registered yet.</p>
            ) : (
              currentUsers.map((user, index) => (
                <div key={index} className="border p-2 rounded shadow-sm">
                  <p><strong>Name:</strong> {user.fullName}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
