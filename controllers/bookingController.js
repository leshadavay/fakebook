import tryCatchAsyncErrors from "../middlewares/tryCatchAsyncErrors";
import Booking from "../models/booking";
import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

//create new booking  =>  /api/booking
const newBooking = tryCatchAsyncErrors(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });

  console.log("req booking: ", booking);

  res.status(200).json({
    success: true,
    booking,
  });
});

//check room booking availability => api/booking/check
const checkBookingAvailability = tryCatchAsyncErrors(async (req, res) => {
  let { roomId, checkInDate, checkOutDate } = req.query;

  checkInDate = new Date(checkInDate);
  checkOutDate = new Date(checkOutDate);

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          $lte: checkOutDate,
        },
      },
      {
        checkOutDate: {
          $gte: checkInDate,
        },
      },
    ],
  });

  //check if there is any booking available
  let isAvailable = false;

  if (bookings && bookings.length === 0) {
    isAvailable = true;
  }

  res.status(200).json({
    success: true,
    isAvailable,
  });
});

// get booked dates of a room =>  /api/bookings/dates
const getBookedDatesOfRoom = tryCatchAsyncErrors(async (req, res) => {
  const { roomId } = req.query;

  const booking = await Booking.find({ room: roomId });

  let bookedDates = [];

  //calc 5 hour difference
  const timeDifference = moment().utcOffset() / 60;

  booking.forEach((booking) => {
    const checkInDate = moment(booking.checkInDate).add(
      timeDifference,
      "hours"
    );
    const checkOutDate = moment(booking.checkOutDate).add(
      timeDifference,
      "hours"
    );

    const range = moment.range(moment(checkInDate), moment(checkOutDate));

    const dates = Array.from(range.by("day"));
    bookedDates = bookedDates.concat(dates);
  });

  res.status(200).json({
    success: true,
    bookedDates,
  });
});

// get all bookings of current user => /api/booking/list
const getMyBookings = tryCatchAsyncErrors(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    bookings,
  });
});

export {
  newBooking,
  checkBookingAvailability,
  getBookedDatesOfRoom,
  getMyBookings,
};
