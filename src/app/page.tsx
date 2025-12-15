'use client';

import {
  Sparkles,
  PenTool,
  Layers,
  MonitorPlay,
  ArrowRight,
  Wand2,
} from 'lucide-react';
import { Navbar } from '@/components/ui/navbar';
import {
  ProgressBar,
  ActionButton,
  ImagePreview,
} from '@/components/studio';
import { useDesignStudio } from '@/hooks';
import { settings } from '@/config/settings';

export default function DesignStudio() {
  const {
    stage,
    project,
    loading,
    error,
    updateProject,
    handleGenerateOriginal,
    handleGenerateSketch,
    handleGenerateExploded,
    goToStage,
    setSelectedImage,
  } = useDesignStudio();

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 pb-20">
      <Navbar />

      <div className="pt-32 px-6 max-w-5xl mx-auto">
        <ProgressBar currentStage={stage} />

        {/* Stage 1: Dream to Draft */}
        <section
          className={`transition-all duration-500 ${
            stage === settings.stages.DREAM
              ? 'opacity-100'
              : 'opacity-40 blur-sm pointer-events-none'
          }`}
        >
          <div className="group relative isolate overflow-hidden rounded-3xl bg-neutral-900/50 border border-white/10 p-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-semibold flex items-center gap-3">
                  <Sparkles className="text-blue-500" /> Dream to Draft
                </h2>
                <p className="text-neutral-400">
                  Hayalindeki ürünü detaylıca anlat. Yapay zeka senin için ilk
                  konsepti oluştursun.
                </p>

                <div className="relative z-[999]">
                  <textarea
                    disabled={loading || stage !== settings.stages.DREAM}
                    value={project.prompt}
                    onChange={(e) => updateProject({ prompt: e.target.value })}
                    placeholder="Örn: Mat siyah kaplamalı, minimalist, ahşap detaylı fütüristik bir kahve makinesi..."
                    className="w-full bg-black/80 border border-white/20 rounded-xl p-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all min-h-[100px] resize-none pointer-events-auto"
                  />

                  <div className="flex flex-wrap gap-4 mt-4">
                    <ActionButton
                      onClick={handleGenerateOriginal}
                      disabled={!project.prompt.trim() || stage !== settings.stages.DREAM}
                      loading={loading}
                      icon={Wand2}
                      variant="primary"
                    >
                      {loading ? 'AI Tasarlıyor...' : 'Konsept Oluştur'}
                    </ActionButton>

                    {project.originalImage && !loading && (
                      <ActionButton
                        onClick={() => goToStage(settings.stages.SKETCH)}
                        icon={ArrowRight}
                        variant="secondary"
                        className="animate-pulse"
                      >
                        Eskiz Aşamasına Geç
                      </ActionButton>
                    )}
                  </div>
                </div>
              </div>

              <ImagePreview
                src={project.originalImage}
                alt="Original concept"
                placeholderIcon={Sparkles}
              />
            </div>
          </div>
        </section>

        {/* Stage 2: Sketch Studio */}
        <section
          className={`mt-8 transition-all duration-500 ${
            stage === settings.stages.SKETCH
              ? 'opacity-100'
              : 'opacity-40 blur-sm pointer-events-none'
          }`}
        >
          <div className="group relative isolate overflow-hidden rounded-3xl bg-neutral-900/50 border border-white/10 p-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-semibold flex items-center gap-3">
                  <PenTool className="text-purple-500" /> Sketch Studio
                </h2>
                <p className="text-neutral-400">
                  Onaylanan konsepti endüstriyel tasarım eskizine dönüştür.
                </p>

                {stage === settings.stages.SKETCH && (
                  <div className="flex flex-wrap gap-4 relative z-[999]">
                    <ActionButton
                      onClick={handleGenerateSketch}
                      loading={loading}
                      icon={PenTool}
                      variant="secondary"
                    >
                      Eskize Dönüştür
                    </ActionButton>

                    {project.sketchImage && !loading && (
                      <ActionButton
                        onClick={() => goToStage(settings.stages.EXPLODE)}
                        icon={ArrowRight}
                        variant="outline"
                        className="animate-pulse"
                      >
                        Patlamış Görünüme Geç
                      </ActionButton>
                    )}
                  </div>
                )}
              </div>

              <ImagePreview
                src={project.sketchImage}
                alt="Sketch"
                placeholderIcon={PenTool}
                onClick={
                  project.sketchImage
                    ? () => setSelectedImage(project.sketchImage)
                    : undefined
                }
                className="relative z-[999]"
              />
            </div>
          </div>
        </section>

        {/* Stage 3: Exploded View */}
        <section
          className={`mt-8 transition-all duration-500 ${
            stage === settings.stages.EXPLODE
              ? 'opacity-100'
              : 'opacity-40 blur-sm pointer-events-none'
          }`}
        >
          <div className="group relative isolate overflow-hidden rounded-3xl bg-neutral-900/50 border border-white/10 p-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-semibold flex items-center gap-3">
                  <Layers className="text-orange-500" /> Exploded View
                </h2>
                <p className="text-neutral-400">
                  Teknik detaylar için ürünü parçalarına ayır (Patlamış
                  Perspektif).
                </p>

                {stage === settings.stages.EXPLODE && (
                  <ActionButton
                    onClick={handleGenerateExploded}
                    loading={loading}
                    icon={ArrowRight}
                    variant="secondary"
                    className="relative z-[999]"
                  >
                    Parçalarına Ayır
                  </ActionButton>
                )}
              </div>

              <ImagePreview
                src={project.explodedImage}
                alt="Exploded view"
                placeholderIcon={Layers}
              />
            </div>
          </div>
        </section>

        {/* Stage 4: Market & Mockup */}
        <section
          className={`mt-8 transition-all duration-500 ${
            stage === settings.stages.MARKET
              ? 'opacity-100'
              : 'opacity-40 blur-sm pointer-events-none'
          }`}
        >
          <div className="group relative isolate overflow-hidden rounded-3xl bg-neutral-900/50 border border-white/10 p-10">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-semibold flex items-center gap-3">
                <MonitorPlay className="text-green-500" /> Market & Mockup
              </h2>
              <p className="text-neutral-400">
                Ürün analizi ve final sunum görselleri.
              </p>

              {stage === settings.stages.MARKET && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h3 className="text-xl font-bold mb-4 text-green-400">
                      Market Fit Analysis
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      Ürün, minimalist ev aletleri pazarında %15 büyüme
                      potansiyeline sahip. Hedef kitle: 25-40 yaş arası, modern
                      tasarıma önem veren kahve severler. Rekabet analizi
                      pozitif.
                    </p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2 text-white">
                        Mockup Studio
                      </h3>
                      <p className="text-sm text-neutral-500 mb-4">
                        Final renderlar hazırlandı.
                      </p>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm pointer-events-auto relative z-[999]">
                        Tümünü İndir (.ZIP)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Error Display */}
        {error && (
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </div>
    </main>
  );
}
