import {Outlet} from 'react-router-dom';

export default function Template() {
    return(
    <div className='min-h-screen bg-grey-900 text-white'>   
        <main>
            <Outlet/>
        </main>
    </div>
    )
}
