import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Gallery',
    description: 'Moments captured from Prithvi over the years — browse photos from 2013 to 2025.',
};

const galleryData = [
    {
        year: 'Prithvi 2025',
        images: [
            '/assets/images/gallery/2025/g1.png',
            '/assets/images/gallery/2025/g2.png',
            '/assets/images/gallery/2025/g3.png',
            '/assets/images/gallery/2025/g4.png',
        ],
    },
    {
        year: 'Prithvi 2018',
        images: [
            '/assets/images/gallery/2018/g1.jpg',
            '/assets/images/gallery/2018/g2.jpg',
            '/assets/images/gallery/2018/g3.jpg',
            '/assets/images/gallery/2018/g4.jpg',
            '/assets/images/gallery/2018/g5.jpg',
            '/assets/images/gallery/2018/g6.jpg',
            '/assets/images/gallery/2018/g7.jpg',
        ],
    },
    {
        year: 'Prithvi 2017',
        images: [
            '/assets/images/gallery/2017/g1.jpg',
            '/assets/images/gallery/2017/g2.jpg',
            '/assets/images/gallery/2017/g3.jpg',
            '/assets/images/gallery/2017/g4.jpg',
            '/assets/images/gallery/2017/g5.jpg',
            '/assets/images/gallery/2017/g6.jpg',
        ],
    },
    {
        year: 'Prithvi 2016',
        images: [
            '/assets/images/gallery/2016/g1.jpg',
            '/assets/images/gallery/2016/g2.jpg',
            '/assets/images/gallery/2016/g3.jpg',
            '/assets/images/gallery/2016/g4.jpg',
            '/assets/images/gallery/2016/g5.jpg',
            '/assets/images/gallery/2016/g6.jpg',
            '/assets/images/gallery/2016/g7.jpg',
            '/assets/images/gallery/2016/g8.jpg',
            '/assets/images/gallery/2016/g9.jpg',
        ],
    },
    {
        year: 'Prithvi 2015',
        images: [
            '/assets/images/gallery/2015/g1.jpg',
            '/assets/images/gallery/2015/g2.jpg',
            '/assets/images/gallery/2015/g3.jpg',
            '/assets/images/gallery/2015/g4.jpg',
        ],
    },
    {
        year: 'Prithvi 2014',
        images: [
            '/assets/images/gallery/2014/g1.jpg',
            '/assets/images/gallery/2014/g2.jpg',
            '/assets/images/gallery/2014/g3.jpg',
            '/assets/images/gallery/2014/g4.jpg',
            '/assets/images/gallery/2014/g5.jpg',
            '/assets/images/gallery/2014/g6.jpg',
            '/assets/images/gallery/2014/g7.jpg',
            '/assets/images/gallery/2014/g8.jpg',
        ],
    },
    {
        year: 'Prithvi 2013',
        images: [
            '/assets/images/gallery/2013/g1.jpg',
            '/assets/images/gallery/2013/g2.jpg',
            '/assets/images/gallery/2013/g3.jpg',
            '/assets/images/gallery/2013/g4.jpg',
            '/assets/images/gallery/2013/g5.jpg',
            '/assets/images/gallery/2013/g6.jpg',
        ],
    },
];

export default function GalleryPage() {
    return (
        <>
            <section className="page-header">
                <h1>Gallery</h1>
                <p>Moments captured from Prithvi over the years</p>
            </section>

            {galleryData.map((section) => (
                <section key={section.year} className="gallery-year">
                    <h2>{section.year}</h2>
                    <div className="gallery-grid">
                        {section.images.map((src, i) => (
                            <Image
                                key={i}
                                src={src}
                                alt={`${section.year} photo ${i + 1}`}
                                width={400}
                                height={300}
                                style={{ width: '100%', height: 'auto', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '14px' }}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </>
    );
}
