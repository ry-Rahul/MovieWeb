import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import "../style.scss";
import useFetch from '../../../hooks/UseFetch';
import { useState } from 'react';
import Carousel from '../../../components/carousel/Carousel';

function Trending() {

    const [endPoint, setEndPoint] = useState('day')

    const { data, loading } = useFetch(`/trending/all/${endPoint}`)

    const onTabChange = (tab) => {
        setEndPoint(tab==='Day'?'day':'week')
    }
  return (
      <div className='carouselSection'>
          <ContentWrapper >
              <span className="carouselTitle">
                    Trending
              </span>
              <SwitchTabs data={['day', 'week',]} onTabChange={ onTabChange} />
          </ContentWrapper>
          <Carousel data={ data?.results} loading={loading} />
          </div>
  )
}

export default Trending