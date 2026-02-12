"use client"
import React from 'react'
import Usertabs from '@/app/components/Usertabs'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Loading from '@/app/components/loding'
import Link from 'next/link'
import { UseProfile } from '@/app/components/UseProfile'
import { useParams } from 'next/navigation'
import { redirect } from 'next/navigation'
import Menuitemsform from '@/app/components/Menuitemsform'
import DeleteButton from '@/app/components/DeleteButton'
const Editmenuitems = () => {

    const { loading: profileloading, data: profiledata } = UseProfile()
    const param = useParams()
    const [menuitems, setmenuitems] = useState(null)
    // Add your code here to fetch the menu items from the database.
    useEffect(() => {
        fetch("/api/menuitems").then((responce => {
            responce.json().then((data => {
                const item = data.find((item) => item._id === param.id)
                setmenuitems(item)
            }))
        }))
    }, [])



    const handlemenusubmit = async (e, data) => {
        e.preventDefault()
        // Add your code here to save the menu item to the database.

        const savemenuitems = new Promise(async (resolve, reject) => {


            data = {
                _id: param.id,
                name: data.itemname,
                description: data.itemdescription,
                price: data.itemprice,
                image: data.image,
                extraingredients: data.ExtraIngredientsPrice,
                sizes: data.sizes,
                category: data.category
            }

            const responce = await fetch("/api/menuitems", {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (responce.ok) {
                resolve()
            }
            else {
                reject()
            }

            await toast.promise(savemenuitems, {
                loading: 'updating..',
                success: 'Menu item update successfully',
                error: 'Failed to update menu item!',
            })

        });

        return redirect('/Menu_items')
    }

    const handledelete = async (id) => {

        const deletemenuitems = new Promise(async (resolve, reject) => {

            const responce = await fetch(`/api/menuitems?_id=${id}`, {
                method: 'DELETE',
            });

            if (responce.ok) {
                resolve();
            }
            else {
                reject();
            }

            await toast.promise(deletemenuitems, {

                loading: "deleting menuitems...",
                success: "deleting menuitems successfully!",
                error: "Failed to delete menuitems!",

            });


        });

        return redirect('/Menu_items')
    }



    if (profileloading) {
        return <Loading />
    }

    if (!profiledata.admin) return <div>You are not authorized to access this page.</div>

    return (
        <>
            <section>
                <Usertabs isAdmin={profiledata.admin} />
                <div className='border border-gray-400 text-center bg-gray-200 rounded-lg md:w-[40vw] w-[48vw] mx-auto font-medium flex justify-center gap-2 items-center text-sm p-1 mb-2' >
                    <Link href={"/Menu_items"}>Show All Menu Items</Link>
                    <img className='w-5' src="/left.svg" alt="" />
                </div>
                <Menuitemsform onSubmit={handlemenusubmit} menuitems={menuitems} />

                <div className='max-w-lg mx-auto  ml-auto flex justify-end'>

                    <div className='w-[26vw] mr-[25px]  border-[1.5px] flex justify-center border-gray-700 rounded-lg'>
                        <DeleteButton
                            lable="Delete this Menu item"
                            onDelete={() => handledelete(param.id)}
                        />
                    </div>

                </div>

            </section>

        </>
    )
}

export default Editmenuitems
