import React, { useEffect, useState } from "react";
import { Button, IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import { Helmet, HelmetProvider} from "react-helmet-async";
import Map from '../../images/volcanoes-Map.png'
import Smithsonian from '../../images/volcanoes-Smithsonian.png'
import NOAA from '../../images/volcanoes-NOAA.png'
import Loading from "../Loading";
import { ArrowBack } from "@mui/icons-material";



const Volcanoes = () => {
        const [loading, setLoading] = useState(true);
        const [info, setInfo] = useState([]);
        const [value, setValue] = useState(0);
    
        const fetchInfo = async () => {
            setInfo(volcanoesInfo);
        }
        
        useEffect
        (() => {
            fetchInfo();
            setTimeout(() => setLoading(false), 1000)
        }, [])
    
        const handleClick = () => {
            window.history.back();
        }
      
        if(loading) {
            return (
                <Loading />
            )
        }
    
        const{ title, header, details, url, img} = info[value]
        return (
            <HelmetProvider>
                <section className="section">
                    <Helmet>
                        <title>Volcanoes</title>
                        <link rel="stylesheet" href="./css/ClimateChange.css"/>
                        <link rel="stylesheet" href="./css/Volcanoes.css"/>
                    </Helmet>
                    <div className="title">
                        <h1>
                            <span>Volcanoes</span>
                            <div className="underline"></div>
                        </h1>
                    </div>
                    <div className="back">
                        <Button  className='btn-vitals'
                        onClick={handleClick}
                        variant="text" 
                        size='large' 
                        startIcon={<ArrowBack />} 
                        >
                            Go back to Vitals
                        </Button>            
                    </div>
                    <div className="website-nav">
                        <div className="btn-container">
                            {volcanoesInfo.map((item, index) => {
                                return (
                                    <button
                                    key={item.title}
                                    onClick={() => setValue(index)}
                                    className={`website-btn ${index === value && 'active-btn'}`}
                                    >
                                    {item.title}
                                    </button>
                                )
                            })}
                        </div>
                        <article className="website-info">
                            <h3 className="website-header">{header}</h3>
                            <p className="details">{details}</p>
                            <ImageListItem>
                                <img className='website-image' src={img} alt='Website homepage'/>
                                <ImageListItemBar
                                    title={title}
                                    position="bottom"
                                    actionIcon={
                                        <IconButton
                                            aria-label={`go to ${title} website`}
                                        >
                                            <a href={url} target='_blank' rel="noreferrer">
                                                <input type='button' className="btn" value='Go to Site' />
                                            </a>
                                        </IconButton>
                                    }
                                    actionPosition="right"
                                />
                            </ImageListItem>
                        </article>
                    </div>
                </section>
            </HelmetProvider>
        )
    }
    
    const volcanoesInfo = [
        {
            title: 'Data Map',
            header: 'Volcanoes and Earthquakes Data Map',
            details: 'Map · Watches and Warnings · Event Development Data · Magnitude Levels',
            url: 'https://www.volcanoesandearthquakes.com/',
            img: Map,
        },
        {
            title: 'Smithsonian',
            header: 'Smithsonian Global Volcanism Program',
            details: 'Map · Eruption Time Tracker · Volcano Database · Weekly Event Reports',
            url: 'https://volcano.si.edu/gvp_currenteruptions.cfm',
            img: Smithsonian,
        },
        {
            title: 'NOAA',
            header: 'Volcano Event Database',
            details: 'Event Search Tool · Historical Database · Damage Data',
            url: 'https://www.ngdc.noaa.gov/hazel/view/hazards/volcano/event-search',
            img: NOAA,
        },

    ]
    
    

export default Volcanoes;