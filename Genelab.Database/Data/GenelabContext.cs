using Genelab.Database.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Genelab.Database.Data
{
    public class GenelabContext : IdentityDbContext<IdentityUser>
    {
		public GenelabContext(DbContextOptions options) : base(options)
		{
		}

		public DbSet<DatosFacturacion> DatosFacturacions { get; set; }
        public DbSet<Domicilio> Domicilios { get; set; }
        public DbSet<Estatus> Estatus { get; set; }
        public DbSet<Estudio> Estudios { get; set; }
        public DbSet<Pago> Pagos { get; set; }
        public DbSet<Resultado> Resultados { get; set; }
        public DbSet<Servicio> Servicios { get; set; }
        public DbSet<ServicioDatosFacturacion> ServicioDatosFacturacions { get; set; }
        public DbSet<ServicioDetalle> ServicioDetalles { get; set; }

        public DbSet<ServicioEstudio> ServicioEstudios { get; set; }
        public DbSet<TipoServicio> TipoServicios { get; set; }

		/// <summary>
		/// Metodo que genera el ORM de datos, para la entidad Anexo
		/// </summary>
		/// <param name="modelBuilder"></param>
		protected void MapPago(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<Pago>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<Pago>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<Pago>().Property(t => t.TipoPago).HasColumnName("TipoPago").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<Pago>().Property(t => t.Tarjeta).HasColumnName("Tarjeta").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<Pago>().Property(t => t.Monto).HasColumnName("Monto").HasColumnType("float").IsRequired();
			modelBuilder.Entity<Pago>().Property(t => t.ImagenId).HasColumnName("ImagenId").HasColumnType("varchar").IsRequired().HasMaxLength(50);

			modelBuilder.Entity<Pago>().ToTable("Pago");
		}
		protected void MapResultado(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<Resultado>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<Resultado>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<Resultado>().Property(t => t.Comentarios).HasColumnName("Comentarios").HasColumnType("varchar").IsRequired().HasMaxLength(250);
			modelBuilder.Entity<Resultado>().Property(t => t.ImagenId).HasColumnName("ImagenId").HasColumnType("varchar").IsRequired().HasMaxLength(50);

			modelBuilder.Entity<Resultado>().ToTable("Resultado");
		}
		protected void MapServicio(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<Servicio>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<Servicio>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<Servicio>().Property(t => t.EstudioId).HasColumnName("EstudioId").HasColumnType("int").IsRequired();
			modelBuilder.Entity<Servicio>().Property(t => t.EstatusId).HasColumnName("EstatusId").HasColumnType("int").IsRequired();
			modelBuilder.Entity<Servicio>().Property(t => t.UsuarioId).HasColumnName("UsuarioId").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<Servicio>().Property(t => t.TipoServicioId).HasColumnName("TipoServicioId").HasColumnType("int").IsRequired();
			modelBuilder.Entity<Servicio>().Property(t => t.FolioPago).HasColumnName("FolioPago").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<Servicio>().Property(t => t.FechaHoraCreacion).HasColumnName("FechaHoraCreacion").HasColumnType("datetime").IsRequired();
			modelBuilder.Entity<Servicio>().Property(t => t.FechaHoraModificacion).HasColumnName("FechaHoraModificacion").HasColumnType("datetime").IsRequired();
			modelBuilder.Entity<Servicio>().Property(t => t.UsuarioCreacion).HasColumnName("UsuarioCreacion").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<Servicio>().Property(t => t.UsuarioModificacion).HasColumnName("UsuarioModificacion").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<Servicio>().Property(t => t.ServicioDetalleID).HasColumnName("ServicioDetalleID").HasColumnType("int").IsRequired();

			modelBuilder.Entity<Servicio>().ToTable("Servicio");
		}
		protected void MapDatosFacturacion(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<DatosFacturacion>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<DatosFacturacion>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<DatosFacturacion>().Property(t => t.EmpresaFiscal).HasColumnName("EmpresaFiscal").HasColumnType("varchar").IsRequired().HasMaxLength(250);
			modelBuilder.Entity<DatosFacturacion>().Property(t => t.CodigoPostal).HasColumnName("CodigoPostal").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<DatosFacturacion>().Property(t => t.DelegacionId).HasColumnName("DelegacionId").HasColumnType("int").IsRequired();
			modelBuilder.Entity<DatosFacturacion>().Property(t => t.Colonia).HasColumnName("Colonia").HasColumnType("varchar").IsRequired().HasMaxLength(150);
			modelBuilder.Entity<DatosFacturacion>().Property(t => t.Calle).HasColumnName("Calle").HasColumnType("varchar").IsRequired().HasMaxLength(250);


			modelBuilder.Entity<DatosFacturacion>().ToTable("DatosFacturacion");

		}
		protected void MapDomicilio(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<Domicilio>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<Domicilio>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<Domicilio>().Property(t => t.CodigoPostal).HasColumnName("CodigoPostal").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<Domicilio>().Property(t => t.DelegacionId).HasColumnName("DelegacionId").HasColumnType("int").IsRequired();
			modelBuilder.Entity<Domicilio>().Property(t => t.Colonia).HasColumnName("Colonia").HasColumnType("varchar").IsRequired().HasMaxLength(150);
			modelBuilder.Entity<Domicilio>().Property(t => t.Calle).HasColumnName("Calle").HasColumnType("varchar").IsRequired().HasMaxLength(250);
			modelBuilder.Entity<Domicilio>().Property(t => t.ServicioId).HasColumnName("ServicioId").HasColumnType("int").IsRequired();

			modelBuilder.Entity<Domicilio>().ToTable("Domicilio");
		}
		protected void MapEstatus(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<Estatus>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<Estatus>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<Estatus>().Property(t => t.Nombre).HasColumnName("Nombre").HasColumnType("varchar").IsRequired().HasMaxLength(50);

			modelBuilder.Entity<Estatus>().ToTable("Estatus");
		}
		protected void MapEstudio(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<Estudio>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<Estudio>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<Estudio>().Property(t => t.Nombre).HasColumnName("Nombre").HasColumnType("varchar").IsRequired().HasMaxLength(150);
			modelBuilder.Entity<Estudio>().Property(t => t.Descripcion).HasColumnName("Descripcion").HasColumnType("varchar").IsRequired().HasMaxLength(500);
			modelBuilder.Entity<Estudio>().Property(t => t.Activo).HasColumnName("Activo").HasColumnType("bit").IsRequired();
			modelBuilder.Entity<Estudio>().Property(t => t.FechaHoraCreacion).HasColumnName("FechaHoraCreacion").HasColumnType("datetime").IsRequired();
			modelBuilder.Entity<Estudio>().Property(t => t.FechaHoraModificacion).HasColumnName("FechaHoraModificacion").HasColumnType("datetime").IsRequired();
			modelBuilder.Entity<Estudio>().Property(t => t.UsuarioCreacion).HasColumnName("UsuarioCreacion").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<Estudio>().Property(t => t.UsuarioModificacion).HasColumnName("UsuarioModificacion").HasColumnType("varchar").IsRequired().HasMaxLength(50);

			modelBuilder.Entity<Estudio>().ToTable("Estudio");
		}
		protected void MapServicioDatosFacturacion(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<ServicioDatosFacturacion>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<ServicioDatosFacturacion>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<ServicioDatosFacturacion>().Property(t => t.ServicioId).HasColumnName("ServicioId").HasColumnType("int").IsRequired();
			modelBuilder.Entity<ServicioDatosFacturacion>().Property(t => t.DatosFacturacionId).HasColumnName("DatosFacturacionId").HasColumnType("int").IsRequired();

			modelBuilder.Entity<ServicioDatosFacturacion>().ToTable("ServicioDatosFacturacion");
		}
		protected void MapServicioDetalle(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<ServicioDetalle>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.NombrePaciente).HasColumnName("NombrePaciente").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.ApellidoPPaciente).HasColumnName("ApellidoPPaciente").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.ApellidoMPaciente).HasColumnName("ApellidoMPaciente").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.NombreTitular).HasColumnName("NombreTitular").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.Parentezco).HasColumnName("Parentezco").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.Edad).HasColumnName("Edad").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.CodigoPostal).HasColumnName("CodigoPostal").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.Colonia).HasColumnName("Colonia").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.Delegacion).HasColumnName("Delegacion").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.Estado).HasColumnName("Estado").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.Pais).HasColumnName("Pais").HasColumnType("varchar").IsRequired().HasMaxLength(50);

			modelBuilder.Entity<ServicioDetalle>().ToTable("ServicioDetalle");
		}
		protected void MapServicioEstudio(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<ServicioEstudio>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<ServicioEstudio>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<ServicioEstudio>().Property(t => t.ServicioId).HasColumnName("ServicioId").HasColumnType("int").IsRequired();
			modelBuilder.Entity<ServicioEstudio>().Property(t => t.EstudioId).HasColumnName("EstudioId").HasColumnType("int").IsRequired();

			modelBuilder.Entity<ServicioEstudio>().ToTable("ServicioEstudio");
		}
		protected void MapTipoServicio(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<TipoServicio>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<TipoServicio>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<TipoServicio>().Property(t => t.Nombre).HasColumnName("Nombre").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<TipoServicio>().Property(t => t.Activo).HasColumnName("Activo").HasColumnType("bit").IsRequired();

			modelBuilder.Entity<TipoServicio>().ToTable("TipoServicio");
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Pago>();
			modelBuilder.Entity<Resultado>();
			modelBuilder.Entity<Servicio>();
			modelBuilder.Entity<DatosFacturacion>();
			modelBuilder.Entity<Domicilio>();
			modelBuilder.Entity<Estatus>();
			modelBuilder.Entity<Estudio>();
			modelBuilder.Entity<DatosFacturacion>();
			modelBuilder.Entity<ServicioDetalle>();
			modelBuilder.Entity<ServicioEstudio>();
			modelBuilder.Entity<TipoServicio>();


			MapPago(modelBuilder);
            MapResultado(modelBuilder);
            MapServicio(modelBuilder);
            MapDatosFacturacion(modelBuilder);
            MapDomicilio(modelBuilder);
            MapEstatus(modelBuilder);
            MapEstudio(modelBuilder);
            MapServicioDatosFacturacion(modelBuilder);
            MapServicioDetalle(modelBuilder);
            MapServicioEstudio(modelBuilder);
            MapTipoServicio(modelBuilder);
        }

		


	}
}
