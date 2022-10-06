import React, { useEffect, useState } from 'react';
import DataList from '../../../Components/DataList/DataList';
import newsAPI from '.././../../shared/APICalls';

const News = () => {
    const [ news, setNews ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const getNews = async () => {
            try {
                const res = await newsAPI.get('/news')
                setNews(res.data)
            } catch (error) {
                console.log(error)
            }finally {
                setTimeout(function(){
                    setLoading(false)
                }, 500);
            }
        }
        getNews();
    }, []);

    return (
        <div className='min-h-full m-auto my-[56px] p-6'>
            <h1 className='font-bold text-4xl mb-[54px] text-center'>Novedades</h1>
            <DataList data={news} loading={loading} type='new' title='novedades'/>
        </div>
    );
}
 
export default News;