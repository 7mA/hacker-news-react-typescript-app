import React from 'react';

const NewsFeedLoadingItem: React.FC = () => {
    return (
        <li className="animate-pulse bg-white shadow-md rounded-lg p-4 mt-5">
            <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                </div>
            </div>
        </li>
    );
};

export default NewsFeedLoadingItem;