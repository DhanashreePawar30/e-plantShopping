import React from 'react'; import {useDispatch,useSelector} from 'react-redux'; import {Check,Plus} from 'lucide-react'; import {addToCart,selectCartItems} from './CartSlice.jsx';
const plants=[
['pothos','Golden Pothos','Easy-care favourites',18,'Trailing heart-shaped leaves that thrive with little fuss.','photo-1614594975525-e45190c55d0b'],
['snake','Snake Plant','Easy-care favourites',24,'Upright leaves for a modern corner.','photo-1593482892290-f54927ae2b7e'],
['zz','ZZ Plant','Easy-care favourites',22,'Glossy foliage and a relaxed care routine.','photo-1632207691143-643e2a5c9b3b'],
['rubber','Rubber Plant','Easy-care favourites',29,'Bold leaves bring height and character.','photo-1509423350716-97f9360b4e09'],
['jade','Jade Plant','Easy-care favourites',16,'A compact succulent with rounded leaves.','photo-1501004318641-b39e6451bec6'],
['monstera','Monstera Deliciosa','Easy-care favourites',35,'A statement plant with iconic split leaves.','photo-1615874694520-474822394e73'],
['lavender','Lavender','Aromatic plants',20,'Fragrant foliage and soft purple blooms.','photo-1499002238440-d264edd596ec'],
['rosemary','Rosemary','Aromatic plants',14,'A fragrant herb with needle-like leaves.','photo-1515586000433-45406d8e6662'],
['mint','Mint','Aromatic plants',12,'Fresh green leaves for a kitchen windowsill.','photo-1628556270448-4d4e4148e1b1'],
['basil','Sweet Basil','Aromatic plants',13,'A kitchen favourite with aromatic leaves.','photo-1618375569909-3c8616cf7733'],
['thyme','Garden Thyme','Aromatic plants',15,'Small leaves and a lovely herbal scent.','photo-1466692476868-aef1dfb1e735'],
['lemonbalm','Lemon Balm','Aromatic plants',17,'Soft green leaves with a lemon fragrance.','photo-1509423350716-97f9360b4e09'],
['aloe','Aloe Vera','Wellness greens',19,'A sculptural succulent for bright spaces.','photo-1509423350716-97f9360b4e09'],
['peace','Peace Lily','Wellness greens',27,'Elegant foliage with graceful white blooms.','photo-1593691509543-c55fb32e5cee'],
['spider','Spider Plant','Wellness greens',17,'Arching leaves add playful texture.','photo-1572688484438-313a6e50c333'],
['fern','Boston Fern','Wellness greens',23,'Feathery foliage softens shelves and rooms.','photo-1597055181300-e3633a917d8f'],
['calathea','Calathea','Wellness greens',31,'Decorative patterned leaves with a tropical feel.','photo-1604762524889-3e2fcc145683'],
['parlor','Parlor Palm','Wellness greens',26,'A graceful palm with a soft silhouette.','photo-1597055181300-e3633a917d8f']
].map(([id,name,category,price,description,img])=>({id,name,category,price,description,image:`https://images.unsplash.com/${img}?auto=format&fit=crop&w=900&q=85`}));
const categories=['Easy-care favourites','Aromatic plants','Wellness greens'];
export default function ProductList(){const dispatch=useDispatch();const cart=useSelector(selectCartItems);const added=new Set(cart.map(x=>x.id));return <main className="page-container"><section className="page-intro"><p className="eyebrow">THE GREENHOUSE COLLECTION</p><h1>Find your kind of <em>green.</em></h1><p>From easy-care companions to fragrant favourites, meet the plant that belongs in your space.</p></section>{categories.map(category=><section className="plant-category" key={category}><div className="category-heading"><h2>{category}</h2><span>{plants.filter(p=>p.category===category).length} plants</span></div><div className="plant-grid">{plants.filter(p=>p.category===category).map(plant=>{const isAdded=added.has(plant.id);return <article className="plant-card" key={plant.id}><div className="plant-image-wrap"><img src={plant.image} alt={plant.name} loading="lazy"/><span className="plant-category-label">{category}</span></div><div className="plant-card-body"><h3>{plant.name}</h3><p>{plant.description}</p><div className="plant-card-bottom"><span className="price">${plant.price.toFixed(2)}</span><button className={`add-button ${isAdded?'added':''}`} disabled={isAdded} onClick={()=>dispatch(addToCart(plant))}>{isAdded?<><Check size={16}/> Added</>:<><Plus size={16}/> Add to Cart</>}</button></div></div></article>})}</div></section>)}</main>}