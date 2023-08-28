import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(req: Request, res: Response) {
  // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "")
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase
    .from('jonventory')
    .select()

  console.log(data)
  return new Response(JSON.stringify(data));
}

export async function POST(req: Request, res: Response) {
  const supabase = createServerComponentClient({ cookies })
  console.log(supabase)
  const body = await req.json();
  console.log("The req body is: " + JSON.stringify(body));

  const { data, error } = await supabase
    .from('jonventory')
    .insert([{ name: body.name, brand: body.brand, imageurl: body.imageUrl, user_id: body.uid }]).select()

  if (error) {
    console.log("Error inserting data: ", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data));
}

export async function DELETE(req: Request, res: Response) {

  const supabase = createServerComponentClient({ cookies })

  const body = await req.json();
  console.log("The req body is: " + JSON.stringify(body));

  const { error } = await supabase
    .from('jonventory')
    .delete()
    .eq('id', JSON.stringify(body))

  if (error) {
    console.log("Error inserting data: ", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(body.key));
}