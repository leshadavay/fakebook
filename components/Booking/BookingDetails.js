import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/bookingActions";

import Link from "next/link";
import Image from "next/image";

function BookingDetails() {
  const dispatch = useDispatch();
  const { booking, error } = useSelector((state) => state.bookingDetails);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 booking-details">
          {booking && (
            <>
              <h2 className="my-5 text-info">Booking # {booking._id}</h2>

              <h4 className="mb-4 text-info">User Info</h4>
              <p>
                <b>Name:</b> {booking.user.name}
              </p>
              <p>
                <b>Email:</b> {booking.user.email}
              </p>
              <p>
                <b>Amount:</b> ${booking.amountPaid}
              </p>

              <hr />

              <h4 className="mb-4 text-info">Booking Info</h4>
              <p>
                <b>Check In:</b>{" "}
                {new Date(booking.checkInDate).toLocaleString("en-US")}
              </p>
              <p>
                <b>Check Out:</b>{" "}
                {new Date(booking.checkOutDate).toLocaleString("en-US")}
              </p>
              <p>
                <b>Days of Stay:</b> {booking.daysOfStay}
              </p>

              <hr />

              <h4 className="my-4 text-info">Payment Status</h4>
              <p className="greenColor">
                <b>
                  {booking.paymentInfo.status &&
                    booking.paymentInfo.status.toUpperCase()}
                </b>
              </p>

              <h4 className="mt-5 mb-4 text-info">Booked Room:</h4>

              <hr />
              <div className="cart-item my-1">
                <div className="row my-5">
                  <div className="col-4 col-lg-2">
                    <Image
                      src={booking.room.images[0].url}
                      alt={booking.room.name}
                      height={45}
                      width={65}
                    />
                  </div>

                  <div className="col-5 col-lg-5">
                    <Link href={`/room/${booking.room._id}`}>
                      {booking.room.name}
                    </Link>
                  </div>

                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p>${booking.room.pricePerNight}</p>
                  </div>

                  <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <p>{booking.daysOfStay} Day(s)</p>
                  </div>
                </div>
              </div>
            </>
          )}
          <hr />
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
