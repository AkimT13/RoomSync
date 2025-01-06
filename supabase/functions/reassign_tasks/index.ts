import { createClient } from '@supabase/supabase-js';

// Supabase environment variables
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handleRequest(req: Request): Promise<Response> {
  try {
    console.log("Starting recurring task reassignment...");

    // Step 1: Get all completed recurring tasks
    const { data: tasks, error: taskError } = await supabase
      .from('tasks')
      .select('*')
      .eq('complete', true)
      .not('frequency', 'is', null);

    if (taskError) throw taskError;

    // Step 2: Iterate through tasks and reassign
    for (const task of tasks) {
      console.log(`Processing task: ${task.id}`);

      // Step 3: Get all active renters in the same space
      const { data: renters, error: renterError } = await supabase
        .from('tenants')
        .select('renter_id')
        .eq('space_id', task.space_id)
        .eq('is_active', true);

      if (renterError) throw renterError;

      if (renters.length === 0) {
        console.log(`No active renters found for space ${task.space_id}`);
        continue;
      }

      // Step 4: Select a random renter
      const randomRenter = renters[Math.floor(Math.random() * renters.length)];

      // Step 5: Reassign task
      const { error: updateError } = await supabase
        .from('tasks')
        .update({
          renter_id: randomRenter.renter_id,
          complete: false
        })
        .eq('id', task.id);

      if (updateError) throw updateError;

      console.log(`Task ${task.id} reassigned to renter ${randomRenter.renter_id}`);
    }

    return new Response("Recurring tasks reassigned successfully!", { status: 200 });
  } catch (error) {
    console.error("Error in recurring task reassignment:", error);
    return new Response(JSON.stringify({ error: Error}), { status: 500 });
  }
}
