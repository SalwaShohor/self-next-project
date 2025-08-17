// src/pages/api/family-tree.js

import clientPromise from "@/lib/mongodb"; // Use relative path if not using alias

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB); // DB name from .env.local

    const collection = db.collection("family_tree_data"); // Replace with your actual collection name

    // If your collection has one document with { nodes, edges, combos }, return it:
    const data = await collection.findOne({});

    // If your collection has multiple documents and you need to return all:
    // const data = await collection.find({}).toArray();

    res.status(200).json(data);
  } catch (error) {
    console.error("API error in /api/family-tree:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
