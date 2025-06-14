import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Clock, Award, Search, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import BatchCard from '../components/BatchCard';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';
import { Batch } from '../types/batch';

const UserDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [batches, setBatches] = useState<Batch[]>([]);

  // Fetch batches from backend
  useEffect(() => {
    axios.get('http://localhost:4000/api/public-batches')
      .then((res) => {
        const formatted = res.data.map((b: any) => ({
          ...b,
          id: b._id,
          mode: b.mode as 'online' | 'offline',
          language: b.language as 'English' | 'Hindi' | 'Marathi',
        }));
        setBatches(formatted);
      })
      .catch(err => console.error('Error fetching batches:', err));
  }, []);

  // Mock enrolled batch IDs (in real app, fetch user's enrolled batches)
  const enrolledBatchIds = ['1', '2'];
  const enrolledBatches = batches.filter(batch => enrolledBatchIds.includes(batch.id));

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || batch.language === selectedLevel;
    const matchesStatus = selectedStatus === 'all' || batch.mode === selectedStatus;
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const handleEnroll = (batchId: string) => {
    toast({
      title: 'Enrollment Successful!',
      description: 'You have been enrolled in the batch. Check your enrolled courses.',
    });
  };

  const handleViewDetails = (batchId: string) => {
    console.log('View details for batch:', batchId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.fullName}!
              </h1>
              <p className="text-gray-600">Continue your trading education journey</p>
            </div>
            <Link to="/">
              <Button variant="outline" className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrolledBatches.length}</div>
              <p className="text-xs text-muted-foreground">Active enrollments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Courses</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{batches.length}</div>
              <p className="text-xs text-muted-foreground">Total courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Earned</p>
            </CardContent>
          </Card>
        </div>

        {enrolledBatches.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Enrolled Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledBatches.map((batch) => (
                <Card key={batch.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={batch.thumbnail}
                      alt={batch.batchName}
                      className="w-full h-32 object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-green-500">Enrolled</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{batch.batchName}</h3>
                    <p className="text-sm text-gray-600 mb-3">Instructor</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{batch.duration}</span>
                      <Button size="sm">Continue Learning</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Available Courses</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Languages</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Marathi">Marathi</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Modes</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBatches.map((batch) => (
              <BatchCard
                key={batch.id}
                batch={batch}
                onEnroll={handleEnroll}
                onViewDetails={handleViewDetails}
                showEnrollButton={!enrolledBatchIds.includes(batch.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
