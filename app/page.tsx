import Image from 'next/image';
import Countdown from './components/Countdown';
import HeroButton from './components/HeroButton';

interface Sponsor {
  id: number;
  image: string;
  alt: string;
}

async function getSponsors(): Promise<Sponsor[]> {
  // Hard-coded data — same as API route
  return Array.from({ length: 27 }, (_, i) => ({
    id: i + 1,
    image: `/assets/images/sponsors/s${i + 1}.png`,
    alt: `Sponsor ${i + 1}`,
  }));
}

export default async function HomePage() {
  const sponsors = await getSponsors();

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="logo-center-grp">
          <Image src="/assets/images/logos/logo1.jpeg" alt="Prithvi Logo" width={90} height={90} priority />
          <Image src="/assets/images/logos/logo3.jpeg" alt="ESSC Logo" width={90} height={90} priority />
        </div>

        <h1 className="hero-section-heading">PRITHVI 2026</h1>

        <p className="hero-date">3 – 5 April 2026 · IIT Kharagpur</p>

        <p className="hero-section-para">
          Prithvi is the annual symposium of the Department of Geology and Geophysics
          along with the IIT Kharagpur student chapters of Earth Science Study Circle.
        </p>

        <HeroButton />
      </section>

      {/* ABOUT PRITHVI */}
      <section className="about-section">
        <div className="about-card">
          <div className="about-image">
            <Image
              src="/assets/images/about/Pritvi-aboutus.avif"
              alt="Prithvi Fest"
              width={600}
              height={320}
              style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '14px' }}
            />
          </div>
          <div className="about-text">
            <h2>About Prithvi</h2>
            <p>
              Prithvi is the annual symposium of the Department of Geology and Geophysics
              along with the IIT Kharagpur student chapters of Earth Science Study Circle (ESSC).
            </p>
            <p>
              Prithvi is one of the largest fests of Earth Sciences in India with participation
              from over 600 students from more than 60 universities across the country. Born in
              2009 with the motto of promoting technology, scientific thinking, and innovation,
              Prithvi has completed 16 golden years of creating an unmatched aura of a science
              and technology spectacle year after year at the IIT Kharagpur campus.
            </p>
            <p>
              Through the myriad events held during the fest, a student is tested on theoretical
              knowledge and the practical application of concepts. Over the years, Prithvi has
              evolved to provide a platform for the youth to showcase their talents and skill sets
              in fierce competitions, display cutting-edge technology and research from all over the
              globe and have world-renowned personalities motivate the youth in the field of Geosciences.
            </p>
            <p>
              Prithvi 2026 is a further step in this journey. We take immense pleasure in presenting
              the 14th edition of Prithvi, to be held from 3rd April to 5th April, 2026, at IIT Kharagpur.
            </p>
            <p>
              The stage is again set for a perfect meeting of academia, alumni, and industry. The
              symposium will feature many competitions, workshops, exhibitions, and guest lectures
              focusing on exploration and various Earth Science fronts.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT IIT KGP */}
      <section className="about-section">
        <div className="about-card reverse">
          <div className="about-image">
            <Image
              src="/assets/images/about/iitkgp-home.jpeg"
              alt="IIT Kharagpur"
              width={600}
              height={320}
              style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '14px' }}
            />
          </div>
          <div className="about-text">
            <h2>IIT Kharagpur</h2>
            <p>
              Being the first IIT to be established, Indian Institute of Technology Kharagpur has
              emerged as one of the most reputed technological institutions in the country.
            </p>
            <p>
              Recognized as an Institute of National Importance by the Government of India in 1956,
              IIT Kharagpur spans over 2100 acres, of campus hosting the largest number of departments
              and the highest student enrollment among government-run colleges.
            </p>
            <p>
              With state-of-the-art research facilities available to students across a diverse range
              of fields, this institute has carved its path to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="sponsors">
        <h1>Previous Sponsors</h1>
        <div className="sponsor-grid">
          {sponsors.map((sponsor) => (
            <Image
              key={sponsor.id}
              src={sponsor.image}
              alt={sponsor.alt}
              width={120}
              height={55}
              style={{ maxHeight: '55px', width: 'auto', objectFit: 'contain' }}
            />
          ))}
        </div>
      </section>

      {/* COUNTDOWN */}
      <Countdown />
    </>
  );
}
