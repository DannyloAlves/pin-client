import "./styles/GlobalStyles";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from './routes/layouts/mainLayout';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const Homepage = React.lazy(() => import("./routes/homepage"));
const CreatePage = React.lazy(() => import("./routes/createPage"));
const PostPage = React.lazy(() => import("./routes/postPage"));
const ProfilePage = React.lazy(() => import("./routes/profilePage"));
const SearchPage = React.lazy(() => import("./routes/searchPage"));
const AuthPage = React.lazy(() => import("./routes/authPage"));

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/pin/:id" element={<PostPage />} />
            <Route path="/:username" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
