import connectDB from "@/app/DB/cunnectDb";
import MenuItems from "@/app/models/MenuItems";
export async function POST(req) {
    // Create a new document
    const data = await req.json();
    if (data.category === '') {
        delete data.category;
    }
    // Save the document to the database
    await connectDB();
    await MenuItems.create(data)
    return Response.json(true);
};

export async function GET() {
    // Get all documents
    await connectDB();
    const menuItems = await MenuItems.find({});
    return Response.json(menuItems);
}

export async function PUT(req) {
    // Create a new document
    const data = await req.json();
    await connectDB();
    const menuItems = await MenuItems.updateOne({ _id: data._id }, { ...data });
    return Response.json(menuItems);
};

export async function DELETE(req) {
    // Delete the document
    await connectDB();
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await MenuItems.deleteOne({ _id: _id });

    return Response.json(true);
}