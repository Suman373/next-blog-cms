import { FileText, Tags, Edit3 } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Blog Management</h3>
            <p className="text-gray-600">Create, edit, and manage your blog posts with a simple and intuitive interface.</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tags className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Category Organization</h3>
            <p className="text-gray-600">Organize your content with categories and filter posts for better navigation.</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit3 className="text-purple-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Markdown Support</h3>
            <p className="text-gray-600">Write your posts in markdown with live preview for a seamless writing experience.</p>
          </div>
        </div>
      </div>
    </section>
  );
}