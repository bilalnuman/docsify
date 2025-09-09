import React from "react";
import FallingDebriComponent from "@/features/Dashboard/training/FallingDebris";
import { useParams } from "react-router-dom";
import { useTrainingFolderFiles } from "@/hooks/useTraining";
import Spinner from "@/components/Spinner";
import NotFound from "@/components/Notfound";

const FolderDetail = () => {
    const { id: idParam } = useParams<{ id?: string }>();
    const id = idParam ? Number(idParam) : NaN;
    if (!idParam || Number.isNaN(id)) {
        return <NotFound message="Invalid folder ID." />;
    }

    const { data, isLoading, isError } = useTrainingFolderFiles(id);
    const source = data;

    if (isLoading) {
        return (
            <div className="col-span-12 text-center">
                <Spinner />
            </div>
        );
    }

    if (isError) {
        return <NotFound message="Failed to load data." />;
    }

    if (!source) {
        return <NotFound message="Data not found!" />;
    }

    return <FallingDebriComponent source={source} />;
};

export default FolderDetail;
