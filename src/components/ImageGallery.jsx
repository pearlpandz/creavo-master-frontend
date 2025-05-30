
import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSpring, animated } from '@react-spring/web';

export default function MasonryImageList() {
    const [itemHovered, setHovered] = React.useState(false);
    const springProps = useSpring({
        config: { tension: 300, friction: 20 },
        transition: '0.3s'
    });

    return (
        <Box>
            <ImageList variant="masonry" cols={6} gap={8} sx={{ overflow: 'hidden', m: 0, pt: 1, pl: 1 }}>
                {[...itemData, ...itemData, ...itemData].map((item, index) => (
                    <ImageListItem
                        key={item.img}
                        onMouseEnter={() => setHovered(index)}
                        onMouseLeave={() => setHovered(null)}
                        style={{ cursor: 'pointer' }}
                    >
                        <animated.img
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                            style={{
                                width: '100%',
                                borderRadius: 8,
                                position: 'relative',
                                zIndex: itemHovered === index ? 2 : 1,
                                ...springProps,
                                transform: itemHovered === index ? 'scale(1.25)' : 'scale(1)',
                                boxShadow: itemHovered === index
                                    ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                                    : '0 2px 8px 0 rgba(0,0,0,0.10)',
                            }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
        title: 'Bed',
    },
    {
        img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
        title: 'Books',
    },
    {
        img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
        title: 'Sink',
    },
    {
        img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
        title: 'Kitchen',
    },
    {
        img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
        title: 'Blinds',
    },
    {
        img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
        title: 'Chairs',
    },
    {
        img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
        title: 'Laptop',
    },
    {
        img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
        title: 'Doors',
    },
    {
        img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
        title: 'Storage',
    },
    {
        img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
        title: 'Candle',
    },
    {
        img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
        title: 'Coffee table',
    },
];
