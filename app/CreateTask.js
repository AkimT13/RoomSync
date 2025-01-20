import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, ScrollView } from 'react-native';
import { supabase } from '../utils/supabase';

const CreateTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDay, setDueDay] = useState('');
  const [dueMonth, setDueMonth] = useState('');
  const [dueYear, setDueYear] = useState('');
  const [priority, setPriority] = useState('medium');
  const [frequency, setFrequency] = useState('one-time');
  const [repeatInterval, setRepeatInterval] = useState('1');
  const [repeatOnDays, setRepeatOnDays] = useState([]);
  const [repeatOnMonths, setRepeatOnMonths] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [subtaskText, setSubtaskText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddSubtask = () => {
    if (subtaskText.trim()) {
      setSubtasks([...subtasks, { id: Date.now().toString(), text: subtaskText, completed: false }]);
      setSubtaskText('');
    } else {
      Alert.alert('Error', 'Subtask cannot be empty');
    }
  };

  const handleRemoveSubtask = (id) => {
    setSubtasks(subtasks.filter(subtask => subtask.id !== id));
  };

  const toggleRepeatDay = (day) => {
    setRepeatOnDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  const toggleRepeatMonth = (month) => {
    setRepeatOnMonths((prevMonths) =>
      prevMonths.includes(month) ? prevMonths.filter(m => m !== month) : [...prevMonths, month]
    );
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Task title is required');
      return;
    }

    if (!dueDay || !dueMonth || !dueYear) {
      Alert.alert('Error', 'Complete due date is required');
      return;
    }

    const dueDate = `${dueYear}-${dueMonth.padStart(2, '0')}-${dueDay.padStart(2, '0')}`;

    try {
      setLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase.from('tasks').insert({
        title,
        description,
        due_date: dueDate,
        priority,
        frequency,
        repeat_interval: parseInt(repeatInterval),
        repeat_on_days: frequency === 'weekly' ? repeatOnDays : null,
        repeat_on_months: frequency === 'yearly' ? repeatOnMonths : null,
        subtasks: subtasks.length > 0 ? subtasks : null,
        renter_id: user.id,
        complete: false,
      });

      if (error) throw error;

      Alert.alert('Success', 'Task created successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-800 px-4 py-6 pt-24">
      <View className="bg-livingLightBlue py-6 px-4 rounded-b-lg shadow-lg mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
          <Text className="text-white text-lg">← Back</Text>
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-white">Create a New Task</Text>
      </View>

      <Text className="text-white mb-2">Task Title</Text>
      <TextInput
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
        className="bg-gray-700 text-white p-3 rounded mb-4"
      />

      <Text className="text-white mb-2">Description</Text>
      <TextInput
        placeholder="Enter task description (optional)"
        value={description}
        onChangeText={setDescription}
        className="bg-gray-700 text-white p-3 rounded mb-4"
      />

      <Text className="text-white mb-2">Due Date</Text>
      <View className="flex-row justify-between items-center mb-4">
        <View className="w-1/4">
          <Text className="text-white mb-1">Day (DD)</Text>
          <TextInput
            placeholder="DD"
            value={dueDay}
            onChangeText={setDueDay}
            keyboardType="numeric"
            maxLength={2}
            className="bg-gray-700 text-white p-3 rounded"
          />
        </View>
        <View className="w-1/4">
          <Text className="text-white mb-1">Month (MM)</Text>
          <TextInput
            placeholder="MM"
            value={dueMonth}
            onChangeText={setDueMonth}
            keyboardType="numeric"
            maxLength={2}
            className="bg-gray-700 text-white p-3 rounded"
          />
        </View>
        <View className="w-1/3">
          <Text className="text-white mb-1">Year (YYYY)</Text>
          <TextInput
            placeholder="YYYY"
            value={dueYear}
            onChangeText={setDueYear}
            keyboardType="numeric"
            maxLength={4}
            className="bg-gray-700 text-white p-3 rounded"
          />
        </View>
      </View>

      <Text className="text-white mb-2">Frequency</Text>
      <View className="flex-row justify-between mb-4">
        {['one-time', 'daily', 'weekly', 'monthly', 'yearly'].map(option => (
          <TouchableOpacity
            key={option}
            className={`flex-1 p-3 rounded mx-1 ${
              frequency === option ? 'bg-livingLightBlue' : 'bg-gray-700'
            }`}
            onPress={() => setFrequency(option)}
          >
            <Text className="text-center text-white capitalize">{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {frequency !== 'one-time' && (
        <>
          <Text className="text-white mb-2">Repeat Every</Text>
          <TextInput
            placeholder="Interval (e.g., 1)"
            value={repeatInterval}
            onChangeText={setRepeatInterval}
            keyboardType="numeric"
            className="bg-gray-700 text-white p-3 rounded mb-4"
          />

          {frequency === 'weekly' && (
            <View className="mb-4">
              <Text className="text-white mb-2">Repeat On</Text>
              <View className="flex-row justify-between">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <TouchableOpacity
                    key={day}
                    className={`p-2 rounded ${
                      repeatOnDays.includes(day) ? 'bg-livingLightBlue' : 'bg-gray-700'
                    }`}
                    onPress={() => toggleRepeatDay(day)}
                  >
                    <Text className="text-white text-center text-sm">{day.slice(0, 3)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {frequency === 'yearly' && (
            <View className="mb-4">
              <Text className="text-white mb-2">Repeat In Months</Text>
              <View className="flex-wrap flex-row justify-between">
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                  <TouchableOpacity
                    key={month}
                    className={`p-2 rounded mb-2 ${
                      repeatOnMonths.includes(month) ? 'bg-livingLightBlue' : 'bg-gray-700'
                    }`}
                    onPress={() => toggleRepeatMonth(month)}
                  >
                    <Text className="text-white text-center text-sm">{month.slice(0, 3)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </>
      )}

      <Text className="text-white mb-2">Priority</Text>
      <View className="flex-row justify-between mb-4">
        {['low', 'medium', 'high'].map(level => (
          <TouchableOpacity
            key={level}
            className={`flex-1 p-3 rounded mx-1 ${
              priority === level ? 'bg-livingLightBlue' : 'bg-gray-700'
            }`}
            onPress={() => setPriority(level)}
          >
            <Text className="text-center text-white capitalize">{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-white mb-2">Subtasks</Text>
      <TextInput
        placeholder="Enter subtask"
        value={subtaskText}
        onChangeText={setSubtaskText}
        className="bg-gray-700 text-white p-3 rounded mb-2"
      />
      <TouchableOpacity
        onPress={handleAddSubtask}
        className="bg-livingLightBlue p-3 rounded mb-4"
      >
        <Text className="text-center text-white">Add Subtask</Text>
      </TouchableOpacity>

      <FlatList
        data={subtasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center bg-gray-700 p-3 rounded mb-2">
            <Text className="text-white flex-1">{item.text}</Text>
            <TouchableOpacity onPress={() => handleRemoveSubtask(item.id)}>
              <Text className="text-livingLightBlue">Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />



      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        className="bg-livingLightBlue p-4 rounded mb-6"
      >
        <Text className="text-center text-white text-lg">
          {loading ? 'Creating...' : 'Create Task'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateTaskScreen;