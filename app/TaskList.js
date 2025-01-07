import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { supabase } from '../utils/supabase';
import { completeTask } from './TaskService';

const TaskList = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('renter_id', user.id)
        .eq('complete', false);

      if (error) {
        console.error("Error fetching tasks:", error.message);
      } else {
        setTasks(data);
      }
    };

    fetchTasks();
  }, []);

  const handleCompleteTask = async (task) => {
    await completeTask(task.id, task.space_id, !!task.frequency);
    setTasks(tasks.filter(t => t.id !== task.id)); // Remove from UI
  };

  return (
    <View className="p-4">
      <Text className="text-2xl font-bold text-roomDarkBlue mb-4">Your Active Tasks</Text>
      
      {/* Add Task Button */}
      <TouchableOpacity
        className="bg-roomPink p-3 rounded mb-4"
        onPress={() => navigation.navigate('CreateTask')}
      >
        <Text className="text-white text-center">+ Add Task</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-3 rounded mb-3 shadow">
            <Text className="text-roomDarkBlue font-bold">{item.title}</Text>
            <Text>{item.description}</Text>
            <Text className="text-gray-500">Due: {item.due_date || item.frequency}</Text>

            <TouchableOpacity className="bg-roomPink mt-2 p-2 rounded" onPress={() => handleCompleteTask(item)}>
              <Text className="text-white text-center">Mark as Complete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default TaskList;
