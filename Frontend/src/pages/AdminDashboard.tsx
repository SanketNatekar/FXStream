// AdminDashboard.tsx (updated to use real backend)
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { Batch } from '../types/batch';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [batches, setBatches] = useState<Batch[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Create Batch</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Batch</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateBatch} className="space-y-4">
              {/* Form Fields */}
              <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Title" required className="w-full px-3 py-2 border" />
              <input value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Description" required className="w-full px-3 py-2 border" />
              <input value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} placeholder="Duration" required className="w-full px-3 py-2 border" />
              <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: +e.target.value })} placeholder="Price" required className="w-full px-3 py-2 border" />
              <input type="date" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} required className="w-full px-3 py-2 border" />
              <input value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="Image URL" required className="w-full px-3 py-2 border" />
              <input type="number" value={formData.maxStudents} onChange={e => setFormData({ ...formData, maxStudents: +e.target.value })} placeholder="Total Slots" required className="w-full px-3 py-2 border" />
              <div className="flex justify-end">
                <Button type="submit">Create</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <input
        className="mb-4 p-2 border w-full"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <div className="grid gap-4">
        {filteredBatches.map(batch => (
          <Card key={batch.id}>
            <CardHeader className="flex justify-between">
              <div>
                <CardTitle>{batch.batchName}</CardTitle>
                <p>{batch.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => openEditModal(batch)}><Edit className="h-4 w-4" /></Button>
                <Button size="sm" onClick={() => handleDeleteBatch(batch.id)} variant="destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardHeader>
            <CardContent>
              <p>Start: {new Date(batch.startDate).toLocaleDateString()}</p>
              <p>Duration: {batch.duration}</p>
              <p>Price: ₹{batch.price}</p>
              <p>Slots: {batch.filledSlots || 0}/{batch.totalSlots}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Batch</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditBatch} className="space-y-4">
            {/* Same fields as create */}
            <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Title" required className="w-full px-3 py-2 border" />
            <input value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Description" required className="w-full px-3 py-2 border" />
            <input value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} placeholder="Duration" required className="w-full px-3 py-2 border" />
            <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: +e.target.value })} placeholder="Price" required className="w-full px-3 py-2 border" />
            <input type="date" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} required className="w-full px-3 py-2 border" />
            <input value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="Image URL" required className="w-full px-3 py-2 border" />
            <input type="number" value={formData.maxStudents} onChange={e => setFormData({ ...formData, maxStudents: +e.target.value })} placeholder="Total Slots" required className="w-full px-3 py-2 border" />
            <div className="flex justify-end">
              <Button type="submit">Update</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
