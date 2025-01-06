import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../utils/supabase';

const CreateTask = ({ spaceId, onTaskCreated}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [frequency, setFrequency] = useState(null); // 'daily', 'weekly', 'monthly'
  const [loading, setLoading] = useState(false);

  const handleCreateTask = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase.from('tasks').insert({
        space_id: spaceId,
        renter_id: null, // Task is not assigned yet
        title,
        description,
        due_date: dueDate || null,
        frequency: frequency || null,
        complete: false
      });

      if (error) throw new Error(error.message);

      Alert.alert('Success', 'Task created successfully!');
      setTitle('');
      setDescription('');
      setDueDate('');
      setFrequency(null);
      onTaskCreated(); // Refresh task list
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="p-4 bg-roomLightGreen min-h-screen">
      <Text className="text-2xl font-bold text-roomDarkBlue mb-4">Create a Task</Text>
      <TextInput placeholder="Task Title" className="bg-white p-3 rounded mb-4" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Task Description" className="bg-white p-3 rounded mb-4" value={description} onChangeText={setDescription} />
      <TextInput placeholder="Due Date (YYYY-MM-DD)" className="bg-white p-3 rounded mb-4" value={dueDate} onChangeText={setDueDate} />

      <TouchableOpacity className="bg-roomPink p-3 rounded mb-2" onPress={() => setFrequency('daily')}>
        <Text className="text-white text-center">Set as Daily Task</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-roomPink p-3 rounded mb-2" onPress={() => setFrequency('weekly')}>
        <Text className="text-white text-center">Set as Weekly Task</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-roomPink p-3 rounded mb-4" onPress={() => setFrequency(null)}>
        <Text className="text-white text-center">One-Time Task</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-roomDarkBlue p-3 rounded" onPress={handleCreateTask} disabled={loading}>
        <Text className="text-white text-center">{loading ? 'Creating...' : 'Create Task'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateTask;
