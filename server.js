const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const packages = [
  {
    id: 'PKG001',
    status: 'En tránsito',
    origin: 'Madrid',
    destination: 'Barcelona',
    estimatedDelivery: '2025-08-27',
    currentLocation: 'Centro de distribución Zaragoza'
  },
  {
    id: 'PKG002',
    status: 'Entregado',
    origin: 'Sevilla',
    destination: 'Valencia',
    estimatedDelivery: '2025-08-25',
    currentLocation: 'Entregado al destinatario'
  }
];

app.get('/', (req, res) => {
  res.render('index', { 
    title: 'ExpressPaq - Paquetería Profesional',
    page: 'home'
  });
});

app.get('/servicios', (req, res) => {
  res.render('servicios', { 
    title: 'Nuestros Servicios - ExpressPaq',
    page: 'servicios'
  });
});

app.get('/seguimiento', (req, res) => {
  res.render('seguimiento', { 
    title: 'Seguimiento de Paquetes - ExpressPaq',
    page: 'seguimiento',
    package: null,
    error: null
  });
});

app.post('/seguimiento', (req, res) => {
  const { trackingNumber } = req.body;
  const foundPackage = packages.find(pkg => pkg.id === trackingNumber);
  
  if (foundPackage) {
    res.render('seguimiento', { 
      title: 'Seguimiento de Paquetes - ExpressPaq',
      page: 'seguimiento',
      package: foundPackage,
      error: null
    });
  } else {
    res.render('seguimiento', { 
      title: 'Seguimiento de Paquetes - ExpressPaq',
      page: 'seguimiento',
      package: null,
      error: 'Número de seguimiento no encontrado'
    });
  }
});

app.get('/contacto', (req, res) => {
  res.render('contacto', { 
    title: 'Contacto - ExpressPaq',
    page: 'contacto',
    success: null,
    errors: null
  });
});

app.post('/contacto', [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Email inválido'),
  body('telefono').isMobilePhone('es-ES').withMessage('Teléfono inválido'),
  body('mensaje').isLength({ min: 10 }).withMessage('El mensaje debe tener al menos 10 caracteres')
], (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render('contacto', {
      title: 'Contacto - ExpressPaq',
      page: 'contacto',
      success: null,
      errors: errors.array()
    });
  }
  
  res.render('contacto', {
    title: 'Contacto - ExpressPaq',
    page: 'contacto',
    success: 'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.',
    errors: null
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});