class AppointmentService:
    def __init__(self, appointment_repo, clock):
        # Inyecta reloj y repo para controlar tiempo y persistencia en tests.
        self.appointment_repo = appointment_repo
        self.clock = clock

    def schedule_appointment(self, patient_id, starts_at):
        # Regla 1: la cita debe ser en el futuro.
        # Esta validacion es 100% de negocio y no depende de HTTP ni DB.
        now = self.clock.now()
        if starts_at <= now:
            raise ValueError("APPOINTMENT_MUST_BE_FUTURE")

        # Regla 2: no debe existir conflicto para el mismo paciente y hora.
        has_conflict = self.appointment_repo.has_conflict(patient_id, starts_at)
        if has_conflict:
            raise ValueError("APPOINTMENT_CONFLICT")

        # Guardar si pasa las validaciones.
        # En produccion podria persistir en DB; en tests usamos fake en memoria.
        return self.appointment_repo.save({"patient_id": patient_id, "starts_at": starts_at})
