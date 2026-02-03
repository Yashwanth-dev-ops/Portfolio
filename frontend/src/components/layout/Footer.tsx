export function Footer() {
    return (
        <footer className="bg-metallic-900 border-t border-metallic-700 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-serif font-bold text-white mb-2 tracking-wider">NANDA KISHORE</h3>
                        <p className="text-gray-400 text-sm max-w-xs">
                            Designing scalable, secure, and resilient cloud solutions for the enterprise.
                        </p>
                    </div>

                    <div className="flex gap-4 text-sm text-gray-400 font-mono">
                        <span>© {new Date().getFullYear()} All Rights Reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
