import React, { useEffect, useState } from "react";
import { Button, IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import { Helmet, HelmetProvider} from "react-helmet-async";
import AirNow from '../../images/wildfires-AirNow.png'
import USDA from '../../images/wildfires-USDA.png'
import Loading from "../Loading";
import { ArrowBack } from "@mui/icons-material";



const Wildfires = () => {
        const [loading, setLoading] = useState(true);
        const [info, setInfo] = useState([]);
        const [value, setValue] = useState(0);
    
        const fetchInfo = async () => {
            setInfo(wildfiresInfo);
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
                        <title>Wildfires</title>
                        <link rel="stylesheet" href="./css/ClimateChange.css"/>
                        <link rel="stylesheet" href="./css/Wildfires.css"/>
                    </Helmet>
                    <div className="title">
                        <h1>
                            <span>Wildfires</span>
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
                            {wildfiresInfo.map((item, index) => {
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
    
    const wildfiresInfo = [
        {
            title: 'AirNow',
            header: 'Fire and Smoke Map',
            details: 'Map · Fire Reports · Acres Burned · Percent Contained · Smoke Levels',
            url: 'https://fire.airnow.gov/',
            img: AirNow,
        },
       
        {
            title: 'USDA',
            header: 'U.S. Forest Service Wildfire Map',
            details: 'Map · Fire Reports · Acres Burned · Preparedness Level · Estimated Cost',
            url: 'https://www.fs.usda.gov/science-technology/fire/information',
            img: USDA,
        },
       
    ]
    
    

export default Wildfires;