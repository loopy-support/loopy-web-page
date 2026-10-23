import { createFileRoute } from "@tanstack/react-router";
import { LegalShell, legalHead } from "@/components/loopy/LegalShell";

export const Route = createFileRoute("/privacidad")({
  head: () =>
    legalHead(
      "Loopy · Política de privacidad",
      "Política de privacidad de Loopy: qué datos usa, dónde quedan y cómo los borras. Vigente desde el 22 de octubre de 2026.",
      "/privacidad",
    ),
  component: Privacidad,
});

const MAIL = "mailto:loopy.support.app@gmail.com";

function Privacidad() {
  return (
    <LegalShell chip="Vigente desde el 22 de octubre de 2026">
      <h1>Política de privacidad</h1>
      <p className="fecha">Vigente desde el 22 de octubre de 2026</p>

      <p>Loopy es una app para avanzar en proyectos personales y en equipo. Esta política explica qué datos usa, dónde quedan y cómo los borras. El responsable es Luis Agustín Álvarez Ibaceta. Para cualquier consulta de privacidad, escribe a <a href={MAIL}>loopy.support.app@gmail.com</a>.</p>

      <h2>Resumen</h2>
      <ul>
        <li>Loopy es para personas <strong>mayores de 18 años</strong>.</li>
        <li>Loopy no tiene publicidad, no te rastrea y no usa servicios de analítica de terceros.</li>
        <li>Tus proyectos, check-ins y notas se guardan en este iPhone y en <strong>tu</strong> iCloud. Nosotros no podemos leerlos.</li>
        <li>Lo que compartes con un equipo lo ven las personas de ese equipo.</li>
        <li>Tu perfil social (búsqueda por nombre, racha y XP) está <strong>apagado</strong> hasta que tú lo actives.</li>
        <li>Puedes borrar tu cuenta desde la app: Ajustes › Borrar mi cuenta.</li>
      </ul>

      <h2>Qué datos usa Loopy y para qué</h2>

      <h3>Tu cuenta</h3>
      <p>Loopy usa tu cuenta de iCloud para sincronizar tus datos. No pedimos correo ni contraseña. Para identificarte, la app crea un identificador interno de Loopy. No conocemos tu Apple ID.</p>

      <h3>Tu nombre</h3>
      <p>Te pedimos un nombre solo cuando otra persona lo va a ver: al crear o unirte a un equipo, o al agregar a un amigo. Ese nombre y tu identificador de Loopy se guardan en la base de datos pública de Loopy en iCloud, para que tus amigos y equipos te reconozcan. Otras personas pueden leer ese registro si conocen tu identificador, pero <strong>no pueden encontrarte buscando tu nombre</strong> a menos que actives el perfil social. Nosotros, como responsables de la app, también podemos ver ese registro.</p>

      <h3>Perfil social (opcional)</h3>
      <p>Si activas Ajustes › Privacidad › Perfil social, cualquier persona que use Loopy puede encontrarte por tu nombre y ver tu racha y tu XP. Si lo apagas, dejas de aparecer en la búsqueda y esos datos se quitan del registro público.</p>

      <h3>Proyectos, check-ins, diario y notas</h3>
      <p>Se guardan en este iPhone y en tu base de datos privada de iCloud. Apple los guarda por ti, y nosotros no tenemos acceso a ellos. Las notas marcadas como privadas nunca se comparten.</p>

      <h3>Proyectos en equipo</h3>
      <p>Cuando invitas a alguien o entras a un equipo, el contenido del proyecto se comparte por iCloud con sus integrantes: nombre y objetivo, hitos, check-ins, entradas del diario compartidas y el documento o texto base del proyecto. Cada integrante ve ese contenido en su propia app. Solo entra quien invita quien organiza el equipo: un amigo por su nombre, o la primera persona que abre un enlace de invitación, que sirve una sola vez. Quien organiza también puede aceptar o rechazar a quien pida unirse.</p>

      <h3>Documentos</h3>
      <p>Si adjuntas un PDF o pegas un texto para describir un proyecto, Loopy lo lee en tu iPhone. El texto extraído queda guardado en el proyecto y lo ven los integrantes de su equipo. El archivo original no se sube.</p>

      <h3>Apple Intelligence</h3>
      <p>Las sugerencias y preguntas de reflexión se generan con los modelos de Apple que funcionan <strong>en el dispositivo</strong>. Ese texto no se envía a nosotros ni a terceros. Sin Apple Intelligence, la app funciona a mano.</p>

      <h3>Dictado</h3>
      <p>Si usas «Dictar», Loopy te pide permiso para el micrófono y el reconocimiento de voz. El audio lo procesa el servicio de reconocimiento de voz de Apple, que puede hacerlo en el dispositivo o en servidores de Apple según tu iPhone, de acuerdo con la política de privacidad de Apple. Loopy no guarda el audio, solo el texto que tú confirmas.</p>

      <h3>Compras</h3>
      <p>Los pagos los procesa el App Store. Nosotros no recibimos los datos de tu tarjeta. Loopy verifica las compras con StoreKit. Para sincronizar el acceso grupal, guarda con el proyecto la persona organizadora, el identificador de transacción, su revisión y la fecha efectiva de vencimiento o gracia. Esos datos se comparten con integrantes del proyecto mediante iCloud; no incluyen los datos de pago ni dan acceso a la cuenta de App Store de quien organiza. Un identificador de cuenta derivado de tu identidad de iCloud vincula la suscripción con la persona organizadora.</p>

      <h3>Reportes</h3>
      <p>Si reportas a una persona o un contenido, guardamos el reporte en la base de datos pública de Loopy en iCloud. Ese reporte incluye tu identificador, el de la persona reportada, el motivo y una copia del texto reportado. Solo tú y nosotros podemos leerlo. Lo usamos para revisar el caso y tomar medidas, y lo borramos a los 12 meses de cerrarlo. Si borras tu cuenta, se borran al momento los reportes que hiciste.</p>

      <h3>Notificaciones</h3>
      <p>Si las activas, Loopy te recuerda tus check-ins y te avisa de solicitudes de amistad. Los avisos los entrega Apple (iCloud y el servicio de notificaciones de Apple).</p>

      <h2>Con quién se comparte</h2>
      <p>No vendemos ni compartimos tus datos con anunciantes ni con terceros. Tus datos los guarda Apple (iCloud) como proveedor de la app. Fuera de eso, solo los ven las personas con quienes tú decides compartir: tu equipo y, si activas el perfil social, quienes usan Loopy.</p>

      <h2>Cuánto tiempo los guardamos</h2>
      <ul>
        <li>Mientras tengas tu cuenta, tus datos quedan en tu iCloud.</li>
        <li>Al borrar la cuenta se borran al momento tu perfil público, tus solicitudes de amistad, tus check-ins, tus entradas de diario, tus notas, tu documento base, los reportes que hiciste y el nombre de los hitos que creaste en proyectos de otras personas.</li>
        <li>También se borran al momento tus proyectos, incluidos los que compartías con un equipo: el equipo deja de tenerlos.</li>
        <li>Los reportes que otras personas hicieron sobre ti no se borran con tu cuenta, porque son de quien los hizo. Los necesitamos para revisar cada caso y los borramos a los 12 meses de cerrarlo.</li>
        <li>En los proyectos de otras personas, lo que escribieron los demás es suyo y no se borra con tu cuenta.</li>
      </ul>

      <h2>Tus derechos y cómo retirar tu consentimiento</h2>
      <ul>
        <li><strong>Perfil social:</strong> lo apagas en Ajustes › Privacidad.</li>
        <li><strong>Micrófono, voz y notificaciones:</strong> los quitas en Ajustes del iPhone › Loopy.</li>
        <li><strong>Salir de un equipo:</strong> desde el proyecto, en Salir del proyecto.</li>
        <li><strong>Borrar todo:</strong> en Ajustes › Borrar mi cuenta.</li>
        <li><strong>Acceder, corregir o hacer cualquier otra solicitud:</strong> escribe a <a href={MAIL}>loopy.support.app@gmail.com</a>. Respondemos dentro de 30 días.</li>
      </ul>

      <h2>Menores de edad</h2>
      <p>Loopy es para personas mayores de 18 años. No está dirigida a menores de edad, y no recopilamos a sabiendas datos de menores. Si crees que un menor está usando Loopy, escríbenos a <a href={MAIL}>loopy.support.app@gmail.com</a>.</p>

      <h2>Cambios</h2>
      <p>Si cambiamos esta política, actualizaremos la fecha de arriba. Si el cambio es importante, también te avisaremos en la app.</p>
    </LegalShell>
  );
}
