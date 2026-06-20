# NQTaxi — PostgreSQL Database Setup & Signup API Guide

> **Project**: NQTaxi (Django REST Framework + React)
> **Goal**: Connect PostgreSQL, create tables, and implement Customer & Driver Signup APIs
> **Prepared**: June 2026

---

## 📋 Overview of Steps

| Step | Task | Where |
|------|------|--------|
| 1 | Install & Set Up PostgreSQL | Your PC |
| 2 | Create Database & User | PostgreSQL (psql/pgAdmin) |
| 3 | Configure `.env` file | `backend/.env` |
| 4 | Install Python dependencies | Terminal |
| 5 | Run Django Migrations | Terminal |
| 6 | Verify tables in PostgreSQL | psql/pgAdmin |
| 7 | Build Customer Signup API | `apps/users/` |
| 8 | Build Driver Signup API | `apps/drivers/` |
| 9 | Register URLs | `nqtaxi/urls.py` |
| 10 | Test the APIs | Postman / Browser |

---

## STEP 1 — Install PostgreSQL

1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer. During setup:
   - Set a **password** for the `postgres` superuser (remember this!)
   - Default port: **5432** ✅ (keep it)
3. After installation, open **pgAdmin 4** (installed automatically) or use `psql` from the Start Menu.

---

## STEP 2 — Create the Database and User

### Option A: Using pgAdmin (GUI)
1. Open **pgAdmin 4** → expand **Servers → PostgreSQL**
2. Right-click **Databases** → **Create → Database**
   - Name: `nqtaxi_db`
   - Click **Save**
3. Right-click **Login/Group Roles** → **Create → Login/Group Role**
   - Name tab: `nqtaxi_user`
   - Definition tab → Password: `nqtaxi_pass123` (choose your own)
   - Privileges tab → check **Can login?** ✅
   - Click **Save**
4. Right-click `nqtaxi_db` → **Properties → Security**
   - Add `nqtaxi_user` with all privileges → **Save**

### Option B: Using psql (Terminal)
Open **psql** as the postgres superuser and run:

```sql
-- Create the database
CREATE DATABASE nqtaxi_db;

-- Create a dedicated user
CREATE USER nqtaxi_user WITH PASSWORD 'nqtaxi_pass123';

-- Grant full privileges
GRANT ALL PRIVILEGES ON DATABASE nqtaxi_db TO nqtaxi_user;

-- Exit
\q
```

---

## STEP 3 — Configure the `.env` File

Navigate to `c:\Users\DELL\Desktop\NQTaxi\backend\`

1. Copy the example file:
   ```
   copy .env.example .env
   ```

2. Open `.env` and update the **Database** section:

```env
# Django
SECRET_KEY=your-very-secret-key-here-change-this
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database — PostgreSQL
DB_ENGINE=django.db.backends.postgresql
DB_NAME=nqtaxi_db
DB_USER=nqtaxi_user
DB_PASSWORD=nqtaxi_pass123
DB_HOST=localhost
DB_PORT=5432

# Redis (leave default for now)
REDIS_URL=redis://localhost:6379/1
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=django-db

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

> ⚠️ **Important**: Replace `nqtaxi_pass123` with the actual password you set in Step 2.

---

## STEP 4 — Set Up Python Virtual Environment & Install Dependencies

Open a terminal inside `c:\Users\DELL\Desktop\NQTaxi\backend\` and run:

```powershell
# Create virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Install all required packages
pip install -r requirements.txt
```

> The `requirements.txt` already includes `psycopg2` (PostgreSQL driver for Python), Django, DRF, JWT, etc.

---

## STEP 5 — Run Django Migrations (Create All Tables)

With the virtual environment **activated**, run:

```powershell
# Create migration files (already exists, just in case)
python manage.py makemigrations

# Apply migrations → creates all tables in PostgreSQL
python manage.py migrate
```

**What tables get created:**

| Table Name | App | Description |
|---|---|---|
| `users` | users | Customer & Driver accounts |
| `user_addresses` | users | Saved addresses |
| `driver_profiles` | drivers | Driver-specific info |
| `vehicles` | drivers | Driver's vehicle details |
| `driver_documents` | drivers | License, RC, etc. |
| `rides` | rides | Ride bookings |
| `ride_tracking` | rides | GPS breadcrumbs |
| `ride_ratings` | rides | Post-ride ratings |
| `transactions` | payments | Payment records |
| `wallets` | payments | User wallets |
| `wallet_transactions` | payments | Wallet credit/debit log |
| `invoices` | payments | Ride invoices |
| `notifications` | notifications | In-app notifications |
| `device_tokens` | notifications | Push notification tokens |

---

## STEP 6 — Verify Tables in PostgreSQL

Open **psql** or **pgAdmin** and check:

```sql
-- Connect to the database
\c nqtaxi_db

-- List all tables
\dt

-- Check the users table columns
\d users
```

You should see all the tables listed above.

---

## STEP 7 — Build Customer Signup API

### File: `backend/apps/users/serializers.py`

Open this file and **replace** its content with:

```python
"""
NQ Taxi - Users Serializers
============================
Handles validation and serialization for user registration and profile.
"""

from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, UserAddress


class CustomerSignupSerializer(serializers.ModelSerializer):
    """Serializer for customer (rider) registration."""

    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'},
    )
    confirm_password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
    )

    class Meta:
        model = User
        fields = [
            'email',
            'phone_number',
            'first_name',
            'last_name',
            'password',
            'confirm_password',
            'profile_picture',
        ]
        extra_kwargs = {
            'profile_picture': {'required': False},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs.pop('confirm_password'):
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            role=User.Role.RIDER,
            profile_picture=validated_data.get('profile_picture'),
        )
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    """Read-only serializer for returning user profile after signup."""

    class Meta:
        model = User
        fields = [
            'id', 'email', 'phone_number',
            'first_name', 'last_name', 'role',
            'profile_picture', 'is_verified',
            'created_at',
        ]
        read_only_fields = fields


class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at']
```

---

### File: `backend/apps/users/views.py`

Open this file and **replace** its content with:

```python
"""
NQ Taxi - Users Views
======================
Handles customer registration, login, and profile management.
"""

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import CustomerSignupSerializer, UserProfileSerializer


def get_tokens_for_user(user):
    """Generate JWT access and refresh tokens for a user."""
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class CustomerSignupView(APIView):
    """
    POST /api/v1/users/signup/
    Register a new customer (rider) account.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CustomerSignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            profile = UserProfileSerializer(user).data
            return Response(
                {
                    "message": "Customer account created successfully.",
                    "user": profile,
                    "tokens": tokens,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    """
    GET /api/v1/users/profile/
    Retrieve the logged-in user's profile.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)
```

---

### File: `backend/apps/users/urls.py`

Open this file and **replace** its content with:

```python
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    # Customer Signup
    path('signup/', views.CustomerSignupView.as_view(), name='customer-signup'),

    # User Profile
    path('profile/', views.UserProfileView.as_view(), name='user-profile'),

    # JWT Login & Refresh
    path('login/', TokenObtainPairView.as_view(), name='user-login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]
```

---

## STEP 8 — Build Driver Signup API

### File: `backend/apps/drivers/serializers.py`

Open this file and **replace** its content with:

```python
"""
NQ Taxi - Drivers Serializers
================================
Handles driver registration with license and vehicle details.
"""

from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from apps.users.models import User
from .models import DriverProfile, Vehicle, DriverDocument


class DriverSignupSerializer(serializers.Serializer):
    """
    Combined serializer for driver registration.
    Creates a User (DRIVER role) + DriverProfile in one step.
    """

    # ── User Fields ─────────────────────
    email = serializers.EmailField(required=True)
    phone_number = serializers.CharField(max_length=15, required=True)
    first_name = serializers.CharField(max_length=100, required=True)
    last_name = serializers.CharField(max_length=100, required=True)
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
    )
    confirm_password = serializers.CharField(write_only=True, required=True)
    profile_picture = serializers.ImageField(required=False)

    # ── Driver Profile Fields ────────────
    license_number = serializers.CharField(max_length=50, required=True)
    license_expiry = serializers.DateField(required=True)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_phone_number(self, value):
        if User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("A user with this phone number already exists.")
        return value

    def validate_license_number(self, value):
        if DriverProfile.objects.filter(license_number=value).exists():
            raise serializers.ValidationError("This license number is already registered.")
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs.pop('confirm_password'):
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        # Extract driver-specific fields
        license_number = validated_data.pop('license_number')
        license_expiry = validated_data.pop('license_expiry')

        # Create the User with DRIVER role
        user = User.objects.create_user(
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            role=User.Role.DRIVER,
            profile_picture=validated_data.get('profile_picture'),
        )

        # Create the DriverProfile linked to the user
        driver_profile = DriverProfile.objects.create(
            user=user,
            license_number=license_number,
            license_expiry=license_expiry,
        )

        return user, driver_profile


class DriverProfileSerializer(serializers.ModelSerializer):
    """Serializer to return driver profile details."""

    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_name = serializers.CharField(source='user.full_name', read_only=True)
    user_phone = serializers.CharField(source='user.phone_number', read_only=True)

    class Meta:
        model = DriverProfile
        fields = [
            'id', 'user_email', 'user_name', 'user_phone',
            'license_number', 'license_expiry',
            'availability_status', 'rating', 'total_rides',
            'is_approved', 'created_at',
        ]
        read_only_fields = fields


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'
        read_only_fields = ['id', 'driver', 'created_at']
```

---

### File: `backend/apps/drivers/views.py`

Open this file and **replace** its content with:

```python
"""
NQ Taxi - Drivers Views
========================
Handles driver registration, vehicle management, and document uploads.
"""

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from apps.users.serializers import UserProfileSerializer
from .serializers import DriverSignupSerializer, DriverProfileSerializer


def get_tokens_for_user(user):
    """Generate JWT access and refresh tokens."""
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class DriverSignupView(APIView):
    """
    POST /api/v1/drivers/signup/
    Register a new driver account (creates User + DriverProfile).
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = DriverSignupSerializer(data=request.data)
        if serializer.is_valid():
            user, driver_profile = serializer.save()
            tokens = get_tokens_for_user(user)
            return Response(
                {
                    "message": "Driver account created successfully. Awaiting admin approval.",
                    "user": UserProfileSerializer(user).data,
                    "driver_profile": DriverProfileSerializer(driver_profile).data,
                    "tokens": tokens,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DriverProfileView(APIView):
    """
    GET /api/v1/drivers/profile/
    Get the logged-in driver's profile.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            driver_profile = request.user.driver_profile
            serializer = DriverProfileSerializer(driver_profile)
            return Response(serializer.data)
        except Exception:
            return Response(
                {"error": "Driver profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
```

---

### File: `backend/apps/drivers/urls.py`

Open this file and **replace** its content with:

```python
from django.urls import path
from . import views

urlpatterns = [
    # Driver Signup
    path('signup/', views.DriverSignupView.as_view(), name='driver-signup'),

    # Driver Profile
    path('profile/', views.DriverProfileView.as_view(), name='driver-profile'),
]
```

---

## STEP 9 — Register URLs in Main Router

### File: `backend/nqtaxi/urls.py`

Open this file and make sure it includes the users and drivers routes:

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # API v1
    path('api/v1/users/', include('apps.users.urls')),
    path('api/v1/drivers/', include('apps.drivers.urls')),
    path('api/v1/rides/', include('apps.rides.urls')),
    path('api/v1/payments/', include('apps.payments.urls')),
    path('api/v1/notifications/', include('apps.notifications.urls')),

    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

---

## STEP 10 — Start the Django Server & Test the APIs

### Start the Backend Server

```powershell
# Make sure venv is activated
venv\Scripts\activate

# Start Django development server
python manage.py runserver
```

Server runs at: **http://localhost:8000**

---

### Test API: Customer Signup

**Method**: `POST`
**URL**: `http://localhost:8000/api/v1/users/signup/`
**Headers**: `Content-Type: application/json`

**Request Body:**
```json
{
    "email": "john.rider@example.com",
    "phone_number": "+919876543210",
    "first_name": "John",
    "last_name": "Doe",
    "password": "SecurePass@123",
    "confirm_password": "SecurePass@123"
}
```

**Expected Response (201 Created):**
```json
{
    "message": "Customer account created successfully.",
    "user": {
        "id": "uuid-here",
        "email": "john.rider@example.com",
        "phone_number": "+919876543210",
        "first_name": "John",
        "last_name": "Doe",
        "role": "RIDER",
        "is_verified": false,
        "created_at": "2026-06-11T00:00:00Z"
    },
    "tokens": {
        "refresh": "eyJ...",
        "access": "eyJ..."
    }
}
```

---

### Test API: Driver Signup

**Method**: `POST`
**URL**: `http://localhost:8000/api/v1/drivers/signup/`
**Headers**: `Content-Type: application/json`

**Request Body:**
```json
{
    "email": "ravi.driver@example.com",
    "phone_number": "+919876501234",
    "first_name": "Ravi",
    "last_name": "Kumar",
    "password": "SecurePass@123",
    "confirm_password": "SecurePass@123",
    "license_number": "DL-1234567890",
    "license_expiry": "2027-12-31"
}
```

**Expected Response (201 Created):**
```json
{
    "message": "Driver account created successfully. Awaiting admin approval.",
    "user": { "...": "user details" },
    "driver_profile": {
        "id": "uuid-here",
        "license_number": "DL-1234567890",
        "license_expiry": "2027-12-31",
        "availability_status": "OFFLINE",
        "rating": "0.00",
        "is_approved": false,
        "created_at": "2026-06-11T00:00:00Z"
    },
    "tokens": {
        "refresh": "eyJ...",
        "access": "eyJ..."
    }
}
```

---

### Test API: Customer/Driver Login

**Method**: `POST`
**URL**: `http://localhost:8000/api/v1/users/login/`

```json
{
    "email": "john.rider@example.com",
    "password": "SecurePass@123"
}
```

---

### View Auto-generated API Docs

Open in browser:
- **Swagger UI**: http://localhost:8000/api/docs/
- **ReDoc**: http://localhost:8000/api/redoc/
- **Django Admin**: http://localhost:8000/admin/

---

## 📁 Files You Modified (Summary)

```
backend/
├── .env                          ← Created (DB config)
├── apps/
│   ├── users/
│   │   ├── serializers.py        ← Updated (CustomerSignupSerializer)
│   │   ├── views.py              ← Updated (CustomerSignupView)
│   │   └── urls.py               ← Updated (signup + login routes)
│   └── drivers/
│       ├── serializers.py        ← Updated (DriverSignupSerializer)
│       ├── views.py              ← Updated (DriverSignupView)
│       └── urls.py               ← Updated (signup route)
└── nqtaxi/
    └── urls.py                   ← Verified (all routes included)
```

---

## ⚠️ Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| `django.db.utils.OperationalError` | PostgreSQL not running | Start PostgreSQL service from Windows Services |
| `psycopg2 not installed` | Missing driver | Run `pip install psycopg2-binary` |
| `FATAL: password authentication failed` | Wrong DB credentials | Double-check `.env` password matches PostgreSQL |
| `relation "users" does not exist` | Migrations not run | Run `python manage.py migrate` |
| `ModuleNotFoundError: decouple` | Dependencies missing | Run `pip install -r requirements.txt` |

---

*End of Guide — NQTaxi Database Setup & Signup API*
