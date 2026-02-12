"use client"
import React from 'react'
import { UseProfile } from '@/app/components/UseProfile'
import Loading from '@/app/components/loding'
import Usertabs from '@/app/components/Usertabs'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Menuitemsform from '@/app/components/Menuitemsform'
import { useRouter } from 'next/navigation'
const NewMenuItemPage = () => {

    const { loading: profileloading, data: profiledata } = UseProfile()

    const { push } = useRouter();

    const handlemenusubmit = async (e, data) => {
        e.preventDefault();

        const savePromise = new Promise(async (resolve, reject) => {
            const responce = await fetch("/api/menuitems", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.itemname,
                    description: data.itemdescription,
                    price: data.itemprice,
                    image: data.image,
                    sizes: data.sizes,
                    extraingredients: data.ExtraIngredientsPrice,
                    category: data.category || undefined
                })
            });

            if (responce.ok) {
                resolve();
            } else {
                reject(new Error('Failed to save menu item'));
            }
        });

        await toast.promise(savePromise, {
            loading: 'Saving...',
            success: 'Menu item saved successfully!',
            error: 'Failed to save menu item!',
        });

        // Only redirect if successful (toast.promise resolves)
        // Note: toast.promise returns the promise result, so if it rejects, 
        // the code below might not run if we don't catch it, 
        // but here we just want to redirect on success.
        // Better pattern:
        try {
            await savePromise;
            push('/Menu_items');
        } catch (error) {
            // Error handled by toast
            console.error(error);
        }
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
                    <img className='w-5' src="/left.svg" alt="" />
                    <Link href={"/Menu_items"}>Show All Menu Items</Link>
                </div>
                <Menuitemsform onSubmit={handlemenusubmit} menuitems={null} />

            </section>
        </>
    )
}

export default NewMenuItemPage
