export const StatusFormatter = ({ params }) => {
    console.log("params", params);
    return params ? (
        <span className={params === "available" ? "active" : "inactive"}>
            {params}
        </span>
    ) : (
        "-"
    );
}