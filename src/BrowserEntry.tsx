import PostPage from './pages/PostPage';
import { hydrateRoot } from 'react-dom/client';

const domNode = document.getElementById('root');

const initialData = window.__INITIAL_DATA__;

const root = hydrateRoot(domNode, <PostPage {...initialData} />);