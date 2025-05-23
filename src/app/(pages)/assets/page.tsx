"use client";
import { AssetCharts } from "@/components/main/asset-ui/AssetCharts";
import { AssetTable } from "@/components/main/asset-ui/AssetTable";
import { useAppSelector } from "@/store/hook";

/*
TODO:
1. Create Table View for assets.
2. Handle CRUD Operatins add, edit, update and delete.
3. Work on Filtering.
4. Show Graph -> All time line Chart and Assets Categories
*/

export default function AssetPage() {
  const { assets } = useAppSelector(state => state.asset);
  return (
    <section id="asset-page" className="flex flex-col gap-4 lg:gap-6">
      {/* TODO: give data , and currency props */}
      <AssetCharts assets={assets} />
      <AssetTable assets={assets} />
    </section>
  );
}
