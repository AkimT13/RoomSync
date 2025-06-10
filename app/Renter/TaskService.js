import { supabase } from '../../utils/supabase';

export const completeTask = async (taskId, spaceId, isRecurring) => {
  try {
    const { error: updateError } = await supabase
      .from('tasks')
      .update({ complete: true })
      .eq('id', taskId);

    if (updateError) throw new Error(updateError.message);

    if (isRecurring) {
      const { data: renters, error: renterError } = await supabase
        .from('tenants')
        .select('renter_id')
        .eq('space_id', spaceId)
        .eq('is_active', true);

      if (renterError) throw new Error(renterError.message);
      if (renters.length === 0) return;

      const randomRenter = renters[Math.floor(Math.random() * renters.length)];

      await supabase
        .from('tasks')
        .update({ complete: false, renter_id: randomRenter.renter_id })
        .eq('id', taskId);
    } else {
      await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);
    }

    console.log("Task completion handled successfully!");
  } catch (error) {
    console.error("Error completing task:", error.message);
  }
};
