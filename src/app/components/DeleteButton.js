import React, { useState } from 'react';

const DeleteButton = ({ lable, onDelete }) => {
    const [showconform, setshowconform] = useState(false);

    if (showconform) {
        return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
                <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-xl">
                    <div className="text-base font-semibold text-gray-700 mb-4">
                        Are you sure you want to delete?
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => setshowconform(false)}
                            className="border border-gray-400 rounded-xl px-6 py-2 w-full sm:w-auto"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                onDelete();
                                setshowconform(false);
                            }}
                            className="bg-primary text-white rounded-xl px-6 py-2 w-full sm:w-auto"
                            type="button"
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <button
            className="p-1 text-lg font-medium"
            type="button"
            onClick={() => setshowconform(true)}
        >
            {lable}
        </button>
    );
};

export default DeleteButton;
