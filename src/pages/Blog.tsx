import voyage from '../../assets/voyage.png';
import trip from '../../assets/trip.png';
import way from '../../assets/way.png';
import BlogItem from '../components/BlogItem/BlogItem';

export function Blog({ title }: { title: string }) {
  return (
    <div className="blog-container">
      <h1>{title}</h1>
      <div className="content-container">
        <BlogItem
          imgSrc={voyage}
          imgAlt="voyage"
          content="Choisissez votre destination et fixez vos dates ! ..."
        />
        <BlogItem
          imgSrc={trip}
          imgAlt="trip"
          content="Emballez malin, pensez essentiel ! ..."
        />
        <BlogItem
          imgSrc={way}
          imgAlt="way"
          content="Vérifiez les vaccins nécessaires et consultez un médecin ..."
        />
      </div>
    </div>
  );
}

export default Blog;