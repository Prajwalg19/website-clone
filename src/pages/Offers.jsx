import { collection, getDoc, getDocs, limit, orderBy, query, startAfter, startAt, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import ListingItems from "../components/ListingItems";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
function Offers() {
    const [offers, setOffers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastIndex, setLastIndex] = useState(null);
    useEffect(() => {
        async function fetch() {
            try {
                let docRef = collection(db, "listings");
                let q = query(docRef, where("offer", "==", true), orderBy("time", "desc"), limit(4));
                let snapShots = await getDocs(q);
                let temp = [];
                snapShots.forEach((s) => {
                    temp.push({
                        id: s.id,
                        data: s.data(),
                    });
                });

                setLastIndex(snapShots.docs[snapShots.docs.length - 1]);
                setOffers(temp);
                setLoading(false);
            } catch (e) {
                setLastIndex(false);
                toast.error("Couldn't load Offers");
            }
        }
        fetch();
    }, []);

    async function loadMore() {
        let docRef = collection(db, "listings");
        let q = query(docRef, where("offer", "==", true), orderBy("time", "desc"), startAfter(lastIndex), limit(2)); //startAfter requires orderBy hence i am using it , startAt also doesn't work without orderBy as it gives an error of having many arguments given to the query function and lastIndex
        //is an object (snapShot) and not a index number
        let snapShots = await getDocs(q);
        let temp = [];
        snapShots.forEach((s) => {
            temp.push({
                id: s.id,
                data: s.data(),
            });
        });
        setLastIndex(snapShots.docs[snapShots.docs.length - 1]);
        setOffers((prev) => [...prev, ...temp]);
    }
    return (
        <>
            {loading ? (
                <Spinner />
            ) : offers && offers.length > 0 ? (
                <div className="max-w-7xl m-auto px-3 ">
                    <p className="text-3xl font-bold mt-4 mb-6 text-center">Offers</p>
                    <ListingItems listing={offers} />
                    {lastIndex && (
                        <p className="flex justify-center">
                            <button
                                onClick={() => {
                                    loadMore();
                                }}
                                className="px-2 py-1 bg-slate-200 text-black border border-gray-400 hover:bg-slate-300 active:bg-slate-400 transition ease-in-out hover:shadow-md rounded my-2 "
                            >
                                Load more
                            </button>
                        </p>
                    )}
                </div>
            ) : (
                <span className="text-center font-semibold text-xl ">There's no offers at the moment</span>
            )}
        </>
    );
}

export default Offers;

// <> </> this is called empty fragment
