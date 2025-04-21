import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

// Component to handle smooth scroll to top on route change
const ScrollToTop = () => {
  const [location] = useLocation();
  
  useEffect(() => {
    // Smooth scroll to the top of the page whenever the location changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location]);
  
  return null;
};

function App() {
  return (
    <Layout>
      {/* This component will automatically scroll to top when routes change */}
      <ScrollToTop />
      
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
