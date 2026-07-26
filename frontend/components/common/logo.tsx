export default function Logo(){
    return(
        <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">M</div>

            <div>
                <h1 className="text-xl font-bold">MiniCdn</h1> 
                <p className="text-xs text-gray-500 dark:text-gray-400">Developer Console</p>
            </div>
        </div>
    );
}