"use client"
import React from 'react'
import Image from 'next/image';
import toast from "react-hot-toast";

const EditableImage = ({ Link, setLink }) => {

    const handleFileChange = async (e) => {
        e.preventDefault();
        const savingprofilepromise = new Promise(async (resolve, reject) => {
            const file = e.target.files[0];
            const data = new FormData
            data.set('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                resolve()
            }
            else {
                reject()
            }

            const link = await response.json();
            setLink(link);
        });

        await toast.promise(savingprofilepromise, {
            loading: 'Updating...',
            success: 'Profile Updated Successfully!',
            error: 'Failed to update profile!',
        });

    };


    return (
        <>
            <div className="flex flex-col gap-1 items-center p-1">
                <div className={`bg-gray-300 rounded-lg ${Link?"p-1":""}`} >
                    {Link && <Image className="rounded-xl max-h-36 max-w-24 " src={Link} width={110} height={110} alt="image" />}

                </div>

                <div>
                    {!Link && (
                        <div className='bg-gray-300 min-h-24 min-w-24 flex justify-center items-center rounded-xl'>
                            no image
                        </div>
                    )}
                </div>

                <label className="bg-primary text-white p-1  rounded-xl text-sm border disabled:bg-red-300 cursor-pointer w-28 flex justify-center " htmlFor="avatar">
                    Change Image
                    <input type="file" id="avatar" className="hidden" onChange={handleFileChange} />
                </label>
            </div>
        </>
    )
}

export default EditableImage
