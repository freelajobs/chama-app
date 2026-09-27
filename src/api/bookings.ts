import { api } from "./client";

export const createBooking = (payload: any) => api.post("/bookings", payload).then((r) => r.data);
export const listBookings = (status?: string) => api.get("/bookings", { params: { status } }).then((r) => r.data);
export const getBooking = (id: string) => api.get(`/bookings/${id}`).then((r) => r.data);
export const acceptBooking = (id: string) => api.patch(`/bookings/${id}/accept`).then((r) => r.data);
export const rejectBooking = (id: string) => api.patch(`/bookings/${id}/reject`).then((r) => r.data);
export const updateBookingStatus = (id: string, status: string) =>
  api.patch(`/bookings/${id}/status`, { status }).then((r) => r.data);
export const cancelBooking = (id: string, reason: string) =>
  api.post(`/bookings/${id}/cancel`, { reason }).then((r) => r.data);
export const openDispute = (id: string, motivo: string) =>
  api.post(`/bookings/${id}/disputes`, { motivo }).then((r) => r.data);
export const submitReview = (id: string, nota: number, comentario?: string) =>
  api.post(`/bookings/${id}/reviews`, { nota, comentario }).then((r) => r.data);
export const chargePayment = (booking_id: string, method: string) =>
  api.post("/payments/charge", { booking_id, method }).then((r) => r.data);
export const releasePayment = (id: string) => api.post(`/bookings/${id}/release`).then((r) => r.data);
