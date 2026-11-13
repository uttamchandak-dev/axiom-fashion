'use client';

import { useState } from 'react';
import { MOCK_PRODUCTS } from '@/data/products';

export default function Admin3DAssetsPage() {
  const [selectedProduct, setSelectedProduct] = useState(MOCK_PRODUCTS[0]);
  const [materialType, setMaterialType] = useState('wool');
  const [roughness, setRoughness] = useState(0.85);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">3D Digital Asset Manager</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Configure Three.js / React Three Fiber asset pipelines, GLB/GLTF geometry, physical material shaders, and interactive hotspots.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Product Selector */}
        <div className="lg:col-span-4 bg-white border border-neutral-200 rounded-xs p-5 space-y-4">
          <h2 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
            Select Garment Model
          </h2>
          <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
            {MOCK_PRODUCTS.map((prod) => (
              <button
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className={`w-full text-left p-3 rounded-xs border text-xs transition-colors flex items-center justify-between ${
                  selectedProduct.id === prod.id
                    ? 'border-neutral-900 bg-neutral-50 font-medium text-neutral-900'
                    : 'border-neutral-100 text-neutral-600 hover:border-neutral-300'
                }`}
              >
                <span>{prod.name}</span>
                <span className="text-[10px] text-neutral-400 uppercase">{prod.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: 3D Material & Hotspot Configuration */}
        <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-xs p-6 space-y-6">
          <div className="border-b border-neutral-200 pb-4 flex justify-between items-center">
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">{selectedProduct.name}</h2>
              <p className="text-xs text-neutral-500">ID: {selectedProduct.id} · GLTF Pipeline Ready</p>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-medium px-2.5 py-1 rounded-full uppercase tracking-wider">
              Shader Validated
            </span>
          </div>

          {/* Model File URL */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-neutral-700 block">GLB / GLTF Model Asset URL</label>
            <input
              type="text"
              readOnly
              value={`/models/clothing/${selectedProduct.slug}.glb`}
              className="w-full bg-neutral-50 border border-neutral-200 px-3 py-2 text-xs font-mono text-neutral-600 rounded-xs"
            />
            <p className="text-[11px] text-neutral-400">
              Drop production-ready Draco-compressed GLB files into <code>public/models/</code> for custom meshes.
            </p>
          </div>

          {/* Material Shader Configuration */}
          <div className="space-y-4 pt-2 border-t border-neutral-100">
            <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
              PBR Fabric Material Settings
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-neutral-600 block mb-1.5">Fabric Preset</label>
                <select
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                  className="w-full border border-neutral-200 px-3 py-2 text-xs rounded-xs"
                >
                  <option value="wool">Wool (Matte / High Roughness)</option>
                  <option value="cotton">Heavyweight Cotton (Medium Sheen)</option>
                  <option value="denim">Selvedge Denim (Textured)</option>
                  <option value="leather">Lambskin Leather (High Specular / Clearcoat)</option>
                  <option value="silk">Washed Silk (Lustre / Low Roughness)</option>
                  <option value="nylon">Technical Nylon (Synthetic)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs text-neutral-600 mb-1.5">
                  <span>Roughness</span>
                  <span>{roughness}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={roughness}
                  onChange={(e) => setRoughness(Number(e.target.value))}
                  className="w-full accent-neutral-900"
                />
              </div>
            </div>
          </div>

          {/* Hotspots summary */}
          <div className="space-y-3 pt-2 border-t border-neutral-100">
            <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
              Active 3D Interactive Hotspots (3)
            </h3>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-neutral-50 border border-neutral-100 rounded-xs">
                <p className="font-medium text-neutral-900">1. Italian Wool</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">Pos: [0, 0.85, 0.44]</p>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-100 rounded-xs">
                <p className="font-medium text-neutral-900">2. Architectural Lapel</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">Pos: [0.15, 1.25, 0.25]</p>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-100 rounded-xs">
                <p className="font-medium text-neutral-900">3. Horn Buttons</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">Pos: [0, 0.55, 0.44]</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => alert('3D Configuration Saved Successfully!')}
              className="px-6 py-2.5 bg-neutral-900 text-white text-xs font-medium uppercase tracking-wider rounded-xs hover:bg-black transition-colors"
            >
              Save 3D Preset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
