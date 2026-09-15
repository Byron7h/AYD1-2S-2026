import sys
from pathlib import Path


# Garantiza que la raiz del proyecto este en sys.path para imports tipo `from src...`.
PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))
