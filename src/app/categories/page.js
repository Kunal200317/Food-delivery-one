"use client"
import React, { useState, useEffect } from 'react'
import Usertabs from '../components/Usertabs'
import Loading from '../components/loding'
import { UseProfile } from '../components/UseProfile'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import toast from "react-hot-toast";
import DeleteButton from '../components/DeleteButton'

const Categories = () => {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return redirect('/login');
  }

  const { loading: profileloading, data: profiledata } = UseProfile();
  const [categoryname, setcategoryname] = useState("");
  const [categories, setCategories] = useState([]);
  const [Editecategory, setEditecategory] = useState(null);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    await fetch('/api/categories').then(response =>
      response.json().then(data => {
        setCategories(data);
      }));
  }

  const handlecategorysubmit = async (e) => {
    e.preventDefault();
    const newcategorie = new Promise(async (resolve, reject) => {
      const data = { name: categoryname };
      if (Editecategory) data._id = Editecategory._id;

      const response = await fetch('/api/categories', {
        method: Editecategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      response.ok ? resolve() : reject();

      setcategoryname("");
      fetchCategory();
      setEditecategory(null);
    });

    await toast.promise(newcategorie, {
      loading: Editecategory ? "Updating!" : "Creating new category...",
      success: Editecategory ? "Updated Successfully!" : "Category created!",
      error: Editecategory ? "Update failed!" : "Failed to create category!",
    });
  };

  const handledelete = async (id) => {
    const deletecategorie = new Promise(async (resolve, reject) => {
      const response = await fetch(`/api/categories?_id=${id}`, {
        method: 'DELETE',
      });

      response.ok ? resolve() : reject();

      fetchCategory();
    });

    await toast.promise(deletecategorie, {
      loading: "Deleting category...",
      success: "Category deleted!",
      error: "Delete failed!",
    });
  }

  if (profileloading) return <Loading />
  if (!profiledata.admin) return "Not an admin"

  return (
    <div className="px-4 md:px-10">
      <Usertabs isAdmin={profiledata.admin} />

      {/* Category Form */}
      <form onSubmit={handlecategorysubmit} className="max-w-2xl mx-auto">
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium px-2" htmlFor="category">
            {Editecategory ? "Update Category" : "New Category name"}
            {Editecategory && <>: <b>{Editecategory.name}</b></>}
          </label>

          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <input
              type="text"
              className="bg-gray-200 rounded-2xl p-2 px-4 h-11 w-full border"
              placeholder="Enter category name"
              value={categoryname}
              onChange={(e) => setcategoryname(e.target.value)}
            />

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-primary px-6 py-2 text-lg rounded-3xl text-white whitespace-nowrap"
              >
                {Editecategory ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditecategory(null);
                  setcategoryname('');
                }}
                className="border border-slate-500 p-2 px-4 rounded-full font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Existing Categories */}
      <div className="max-w-2xl mx-auto mt-6">
        <h1 className="text-center font-medium text-lg text-gray-600 mb-3">
          Existing Categories
        </h1>

        {categories.length === 0 && <p>No categories found</p>}

        {categories.length > 0 && categories.map((category) => (
          <div
            key={category._id}
            className="bg-gray-100 border p-3 rounded-xl mb-2 font-medium flex justify-between items-center"
          >
            <span className="hover:underline">{category.name}</span>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditecategory(category);
                  setcategoryname(category.name);
                }}
              >
                <img className="w-5" src="/edit.svg" alt="edit" />
              </button>

              {/* <button onClick={() => {
                if (confirm('Are you sure you want to delete this category?')) {
                  handledelete(category._id);
                }
              }}>
                <img className='w-5' src="/delete.svg" alt="" />
              </button> */}

              <DeleteButton
                lable={<img className="w-5" src="/delete.svg" alt="delete" />}
                onDelete={() => handledelete(category._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
