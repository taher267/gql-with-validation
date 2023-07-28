import { useQuery, useSubscription } from "@apollo/client";
// import Actions from "../../graphql/Actions";
// import { errorFormat } from "../../utils/errorConv";

export default function useGetQurey(
    QRY,
    variables,
    back,
    qryProps,
    completedActions
) {
    const { loading, data, error, refetch } = useQuery(QRY, {
        variables: {
            ...variables,
        },
        ...qryProps,
        onCompleted: (d) => {
            if (completedActions) {
                const { call, callWithData } = completedActions;
                if (call) call?.();
                if (callWithData) callWithData?.(d);
            }
        },
    });
    return {
        data: back ? data?.[back] || data : data,
        loading,
        // error: error ? errorFormat(error) : error,
        error,
        refetch,
    };
}
