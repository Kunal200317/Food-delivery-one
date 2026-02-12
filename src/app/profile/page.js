"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import Usertabs from "../components/Usertabs";
import Loading from "../components/loding";
import UserForm from "../components/UserForm";

const ProfilePage = () => {
  const [user, setuser] = useState(null)
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
     fetch("/api/profile")
        .then((response) => response.json())
        .then((data) => {
          setuser(data);
          setIsAdmin(data.admin);
        })
        .catch(() => {
          toast.error("Failed to load profile data");
        });
    }
  }, [status,status]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  const handleProfileUpdate = async (e,data) => {
    e.preventDefault();
    try {
      await toast.promise(
        fetch("/api/profile", {
          headers: { "Content-Type": "application/json" },
          method: "PUT",
          body: JSON.stringify(data),
        }),
        {
          loading: "Saving...",
          success: "Profile Updated Successfully!",
          error: "Failed to update profile!",
        }
      );
    } catch {
      toast.error("Something went wrong while updating the profile.");
    }
  };



  return (
    <section>
      <Usertabs isAdmin={isAdmin} />
      <div className="md:w-[35vw] mx-auto">
        <UserForm user={user} onsave={handleProfileUpdate} />
      </div>
    </section>
  );
};

export default ProfilePage;
