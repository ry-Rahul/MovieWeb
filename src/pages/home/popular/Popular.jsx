import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import "../style.scss";
import useFetch from '../../../hooks/UseFetch';
import { useState } from 'react';
import Carousel from '../../../components/carousel/Carousel';

function Popular() {

    const [endPoint, setEndPoint] = useState('movie')

    const { data, loading } = useFetch(`/${endPoint}/popular`)

    const onTabChange = (tab) => {
        setEndPoint(tab==='Movies'?'movie':'tv')
    }
  return (
      <div className='carouselSection'>
          <ContentWrapper >
              <span className="carouselTitle">
              What's Popular
              </span>
              <SwitchTabs data={['Movies', 'Tv Shows',]} onTabChange={ onTabChange} />
          </ContentWrapper>
          <Carousel data={ data?.results} loading={loading}  endPoint={endPoint}/>
          </div>
  )
}

export default Popular