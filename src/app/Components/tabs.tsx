
export default function Tabs( { activeTab, onTabClick, tabs }: { activeTab: number; onTabClick: (index: number) => void; tabs: string[] }) {   
    const handleTabClick = (index: number) => {
        onTabClick(index);
    }       
    
    return (
        <div>
        <div className="flex mx-180 mt-5 items-center mb-6">
            {tabs.map((tab, index) => (
            <button
                key={index}
                className={`px-4 py-2 ${activeTab === index ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'} hover:bg-gray-500 border-1`}
                onClick={() => handleTabClick(index)}
            >
                {tab}
            </button>
            ))}
        </div>
        </div>
    );

}
