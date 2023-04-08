import { Routes, Route } from "solid-start";
import Layout from "~/components/shared/Layout";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { faTwitter, faDashcube } from '@fortawesome/free-brands-svg-icons'

// Add fontawesome to library
library.add(fas, far, faTwitter, faDashcube);

export default function Home() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<span>hello</span>} />
      </Route>
    </Routes>
    
  );
}
