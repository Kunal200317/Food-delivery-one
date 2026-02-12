import connectDB from "@/app/DB/cunnectDb";
import Categories from '@/app/models/Categories';
export async function POST(req) {
    // Create a new document
    await connectDB();
    const data = await req.json();
    const responce = await Categories.create(data);

    return Response.json(responce);
}

export async function PUT(req) {
    // Update the document
    await connectDB();
    const data = await req.json();
    await Categories.updateOne({_id: data._id}, {name: data.name});

    return Response.json(true);
}

export async function GET() {
    // Get all documents
    await connectDB();
    const categories = await Categories.find({});
    return Response.json(categories);
}

export async function DELETE(req) {
    // Delete the document
    await connectDB();
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await Categories.deleteOne({_id:_id});
    
    return Response.json(true);
}